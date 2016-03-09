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
            this.overriddenIcon = '';
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

            this.$scope.$on('closedWindow', () => {
                this.overriddenIcon = recentlyClosedWindowIcon;
            });
        }
    }
    ClosedWindowListCtrl.$inject = ['$scope', '$timeout'];

    angular.module('stockflux.closedWindows')
        .controller('ClosedWindowListCtrl', ClosedWindowListCtrl);
}());
