(function() {
    'use strict';

    class SearchCtrl {
        constructor($scope, $timeout, quandlService, selectionService, currentWindowService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.quandlService = quandlService;
            this.selectionService = selectionService;
            this.currentWindowService = currentWindowService;

            this.store = null;
            this.query = '';
            this.noResults = false;
            this.stocks = [];
            this.errors = [];
            this.isLoading = false;

            this._watch();
        }

        getStore() {
            if (!window.storeService) {
                return null;
            }

            if (!this.store) {
                this.store = window.storeService.open(window.name);
            }
            return this.store;
        }

        getFavourites() {
            if (this.getStore()) {
                return this.store.get();
            }
            return null;
        }

        selection() {
            return this.selectionService.selectedStock().code;
        }

        select(stock) {
            reportAction('Select search', stock.code);
            if (this.getStore() && !this.store.isCompact()) {
                this.selectionService.select(stock);
            }
        }

        onSearchKeyDown(event) {
            if (event.keyCode === 38) {
                // Up
                this.changePointer(-1);
            } else if (event.keyCode === 40) {
                // Down
                this.changePointer(1);
            }
            else if (event.keyCode === 13) {
                // Enter
                this.changePointer(0);
            }
            else if (event.keyCode === 27) {
                // Escape
                this.$scope.sidebarCtrl.favouritesClick();
            }
        }

        changePointer(delta) {
            // Change the selection pointer to be the selected stock, if it exists in the list
            // (otherwise, set to -1, which is acceptable as there is no selection yet)
            var currentSelectionPointer = this.stocks.map((stockItem) => {
                return stockItem.code;
            }).indexOf(this.selection());

            var newPointer = currentSelectionPointer + delta;

            newPointer = Math.max(
                0,
                Math.min(
                    newPointer,
                    this.stocks.length - 1
                )
            );

            if (this.stocks.length > 0) {
                this.select(this.stocks[newPointer]);
            }
        }


        submit() {
            if (this.query !== '') {
                reportAction('Search', this.query);
            }

            this.stocks = [];
            this.noResults = false;

            this.currentWindowService.ready(() => {
                if (this.getStore()) {
                    if (this.query) {
                        this.isLoading = true;
                        this.errors = [];
                        this.quandlService.search(this.query, (stocks) => {
                            this.isLoading = false;

                            // removing stocks found with old query
                            this.stocks = this.stocks.filter((result) => {
                                return result.query === this.query;
                            });

                            // Only show the favourites if the query is empty
                            if (this.query.trim() === '') {
                                this.displayFavourites();
                                return;
                            }

                            // Due to the asynchronicity of the search, if multiple searches
                            // are fired off in a small amount of time, with an intermediate one
                            // returning no results it's possible to have both the noResults flag
                            // set to true, while some stocks have been retrieved by a later search.
                            //
                            // Here we re-set the flag to keep it up-to-date.
                            this.noResults = false;

                            stocks.forEach((stock) => {
                                // not adding old stocks
                                if (stock.query !== this.query) {
                                    return;
                                }

                                var stockAdded = false;
                                this.getFavourites().forEach((favourite) => {
                                    if (stock.code === favourite) {
                                        stock.favourite = true;
                                        this.stocks.unshift(stock);
                                        stockAdded = true;
                                    }
                                });

                                if (!stockAdded) {
                                    this.stocks.push(stock);
                                }
                            });
                        },
                        () => {
                            this.noResults = true;
                            this.isLoading = false;
                        },
                        (error) => {
                            this.isLoading = false;
                            this._addError({
                                code: (error && error.code) || 'No code received',
                                message: (error && error.message) || 'No message'
                            });
                        });
                    } else {
                        this.displayFavourites();
                    }
                }
            });
        }

        displayFavourites() {
            var favourites = this.getFavourites();
            if (favourites) {
                favourites.map((favourite) => {
                    this.quandlService.getMeta(favourite, (stock) => {
                        stock.favourite = true;
                        this.stocks.push(stock);
                    });
                });
            }
        }

        _addError(newError) {
            var errors = this.errors, max = errors.length;
            var newCode = newError.code;

            for (var i = 0; i < max; i++) {
                if (errors[i] && errors[i].code === newCode) {
                    errors[i].occurences++;
                    return;
                }
            }
            newError.occurences = 1;
            this.errors.push(newError);
        }

        _watch() {
            this.$scope.$watch(
                // Can't watch `this.query` as the subscribers to this controller
                // may alias it (e.g. `searchCtrl.query`), so instead define a
                // function to decouple scoping.
                () => this.query,
                () => {
                    this.submit();
                });

            this.$scope.$on('updateFavourites', (event, data) => {
                this.$timeout(() => {
                    if (!data) {
                        return;
                    }
                    var index = this.stocks.map((stock) => { return stock.code; }).indexOf(data.code);
                    if (index > -1) {
                        // If the stock in question doesn't exist on the list, check
                        // the favourites and update accordingly
                        this.updateFavouriteStates();
                    } else if (data.favourite && !this.query) {
                        // If there's no query, and the new stock is a favourite,
                        // add it to the list.
                        this.stocks.push(data);
                    }
                });
            });
        }

        /*
        * Updates the favourite states depending on whether or not they're in
        * the window's store (this is the best way to ensure that they are
        * favourites, as the updateFavourites event is broadcast after the store
        * has been updated).
        */
        updateFavouriteStates() {
            var favourites = this.getFavourites();
            if (this.getFavourites()) {
                if (this.query) {
                    // If there's a query, check to see if each stock in the query
                    // is a favourite or not.
                    this.stocks.forEach((stock) => {
                        stock.favourite = favourites.indexOf(stock.code) > -1;
                    });
                } else {
                    // If there's no query, remove any non-favourites.
                    this.stocks = this.stocks.filter((stock) => favourites.indexOf(stock.code) > -1);
                }
            }
        }

        darkenClass(stock) {
            return (this.selection() === stock.code || stock.isHovered);
        }

        selectedClass(stock) {
            return this.selection() === stock.code;
        }
    }
    SearchCtrl.$inject = ['$scope', '$timeout', 'quandlService', 'selectionService', 'currentWindowService'];

    angular.module('stockflux.search')
        .controller('SearchCtrl', SearchCtrl);
}());
