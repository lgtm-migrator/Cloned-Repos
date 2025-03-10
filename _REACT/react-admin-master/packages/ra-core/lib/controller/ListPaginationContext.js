"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePickPaginationContext = void 0;
var react_1 = require("react");
var pick_1 = __importDefault(require("lodash/pick"));
/**
 * Context to store the pagination part of the useListController() result.
 *
 * Use the useListPaginationContext() hook to read the pagination information.
 * That's what List components do in react-admin (e.g. <Pagination>).
 *
 * @typedef {Object} ListPaginationContextValue
 * @prop {boolean}  loading boolean that is true on mount, and false once the data was fetched
 * @prop {integer}  total the total number of results for the current filters, excluding pagination. Useful to build the pagination controls. e.g. 23
 * @prop {integer}  page the current page. Starts at 1
 * @prop {Function} setPage a callback to change the page, e.g. setPage(3)
 * @prop {integer}  perPage the number of results per page. Defaults to 25
 * @prop {Function} setPerPage a callback to change the number of results per page, e.g. setPerPage(25)
 * @prop {string}   resource the resource name, deduced from the location. e.g. 'posts'
 *
 * @typedef Props
 * @prop {ListPaginationContextValue} value
 *
 * @param {Props}
 *
 * @see useListController
 * @see useListContext
 *
 * @example
 *
 * import { useListController, ListPaginationContext } from 'ra-core';
 *
 * const List = props => {
 *     const controllerProps = useListController(props);
 *     return (
 *         <ListPaginationContext.Provider value={controllerProps}>
 *             ...
 *         </ListPaginationContext.Provider>
 *     );
 * };
 */
var ListPaginationContext = react_1.createContext({
    loading: null,
    page: null,
    perPage: null,
    setPage: null,
    setPerPage: null,
    total: null,
    resource: null,
});
ListPaginationContext.displayName = 'ListPaginationContext';
var usePickPaginationContext = function (context) {
    return react_1.useMemo(function () {
        return pick_1.default(context, [
            'loading',
            'page',
            'perPage',
            'setPage',
            'setPerPage',
            'total',
            'resource',
        ]);
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        context.loading,
        context.page,
        context.perPage,
        context.setPage,
        context.setPerPage,
        context.total,
    ]);
};
exports.usePickPaginationContext = usePickPaginationContext;
exports.default = ListPaginationContext;
