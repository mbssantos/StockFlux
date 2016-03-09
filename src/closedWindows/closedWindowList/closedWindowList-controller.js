(function() {
    'use strict';

    const recentlyClosedWindowIcon = 'closed_tabs_active';

    class ClosedWindowListCtrl {
        constructor($scope, $timeout) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.closedWindows = [];
            this.closedTabsShow = false;
            this.overriddenIcon = '';

            this._watch();
        }

        name() {
            return this.$scope.icon;
        }

        override() {
            return this.overriddenIcon;
        }

        refreshClosedWindows() {
            this.closedWindows = window.storeService.getPreviousClosedWindows();
        }

        click() {
            // Send an event back to the parent


            this.refreshClosedWindows();
            this.closedTabsShow = this.closedWindows.length > 0;
        }

        _watch() {
            var listener = () => this.$timeout(() => this.refreshClosedWindows());
            var addListener = () => {
                window.storeService.addClosedWindowListener(listener);
                this.refreshClosedWindows();
            };

            // Can't guarantee that storeService exists, so if it doesn't, watch.
            if (window.storeService) {
                addListener();
            } else {
                this.$scope.$watch(() => window.storeService, () => {
                    addListener();
                });
            }

            this.$scope.$on('$destroy', () => {
                window.storeService.removeClosedWindowListener(listener);
            });

            this.$scope.$on('windowClosed', () => {
                this.overriddenIcon = recentlyClosedWindowIcon;
            });

            this.$scope.$on('closedWindowListOpened', () => {
                this.overriddenIcon = '';
            });
        }
    }
    ClosedWindowListCtrl.$inject = ['$scope', '$timeout'];

    angular.module('stockflux.closedWindows')
        .controller('ClosedWindowListCtrl', ClosedWindowListCtrl);
}());
