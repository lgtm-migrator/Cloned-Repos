/// <reference types="react" />
import { ListControllerProps } from './useListController';
/**
 * Context to store the sort part of the useListController() result.
 *
 * Use the useListSortContext() hook to read the context. That's what many
 * List components do in react-admin (e.g. <SortButton>).
 *
 * @typedef {Object} ListSortContextValue
 * @prop {Object}   currentSort a sort object { field, order }, e.g. { field: 'date', order: 'DESC' }
 * @prop {Function} setSort a callback to change the sort, e.g. setSort('name', 'ASC')
 * @prop {string}   resource the resource name, deduced from the location. e.g. 'posts'
 *
 * @typedef Props
 * @prop {ListSortContextValue} value
 *
 * @param {Props}
 *
 * @see useListController
 * @see useListSortContext
 *
 * @example
 *
 * import { useListController, usePickSortContext, ListSortContext } from 'ra-core';
 *
 * const List = props => {
 *     const controllerProps = useListController(props);
 *     return (
 *         <ListSortContext.Provider value={usePickSortContext(controllerProps)}>
 *             ...
 *         </ListSortContext.Provider>
 *     );
 * };
 */
declare const ListSortContext: import("react").Context<Pick<ListControllerProps<import("..").Record>, "resource" | "currentSort" | "setSort">>;
export declare type ListSortContextValue = Pick<ListControllerProps, 'currentSort' | 'setSort' | 'resource'>;
export declare const usePickSortContext: (context: ListControllerProps) => ListSortContextValue;
export default ListSortContext;
