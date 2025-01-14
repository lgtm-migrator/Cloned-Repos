"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeListRestProps = exports.getListControllerProps = exports.injectedProps = void 0;
var react_1 = require("react");
var inflection_1 = __importDefault(require("inflection"));
var checkMinimumRequiredProps_1 = require("./checkMinimumRequiredProps");
var useListParams_1 = __importDefault(require("./useListParams"));
var useRecordSelection_1 = __importDefault(require("./useRecordSelection"));
var useTranslate_1 = __importDefault(require("../i18n/useTranslate"));
var useNotify_1 = __importDefault(require("../sideEffect/useNotify"));
var useGetMainList_1 = require("../dataProvider/useGetMainList");
var queryReducer_1 = require("../reducer/admin/resource/list/queryReducer");
var actions_1 = require("../actions");
var defaultExporter_1 = __importDefault(require("../export/defaultExporter"));
var core_1 = require("../core");
var defaultSort = {
    field: 'id',
    order: queryReducer_1.SORT_ASC,
};
/**
 * Prepare data for the List view
 *
 * @param {Object} props The props passed to the List component.
 *
 * @return {Object} controllerProps Fetched and computed data for the List view
 *
 * @example
 *
 * import { useListController } from 'react-admin';
 * import ListView from './ListView';
 *
 * const MyList = props => {
 *     const controllerProps = useListController(props);
 *     return <ListView {...controllerProps} {...props} />;
 * }
 */
var useListController = function (props) {
    checkMinimumRequiredProps_1.useCheckMinimumRequiredProps('List', ['basePath'], props);
    var basePath = props.basePath, _a = props.exporter, exporter = _a === void 0 ? defaultExporter_1.default : _a, filterDefaultValues = props.filterDefaultValues, hasCreate = props.hasCreate, _b = props.sort, sort = _b === void 0 ? defaultSort : _b, _c = props.perPage, perPage = _c === void 0 ? 10 : _c, filter = props.filter, _d = props.debounce, debounce = _d === void 0 ? 500 : _d, syncWithLocation = props.syncWithLocation;
    var resource = core_1.useResourceContext(props);
    if (!resource) {
        throw new Error("<List> was called outside of a ResourceContext and without a resource prop. You must set the resource prop.");
    }
    if (filter && react_1.isValidElement(filter)) {
        throw new Error('<List> received a React element as `filter` props. If you intended to set the list filter elements, use the `filters` (with an s) prop instead. The `filter` prop is internal and should not be set by the developer.');
    }
    var translate = useTranslate_1.default();
    var notify = useNotify_1.default();
    var _e = useListParams_1.default({
        resource: resource,
        filterDefaultValues: filterDefaultValues,
        sort: sort,
        perPage: perPage,
        debounce: debounce,
        syncWithLocation: syncWithLocation,
    }), query = _e[0], queryModifiers = _e[1];
    var _f = useRecordSelection_1.default(resource), selectedIds = _f[0], selectionModifiers = _f[1];
    /**
     * We want the list of ids to be always available for optimistic rendering,
     * and therefore we need a custom action (CRUD_GET_LIST) that will be used.
     */
    var _g = useGetMainList_1.useGetMainList(resource, {
        page: query.page,
        perPage: query.perPage,
    }, { field: query.sort, order: query.order }, __assign(__assign({}, query.filter), filter), {
        action: actions_1.CRUD_GET_LIST,
        onFailure: function (error) {
            return notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning', {
                _: typeof error === 'string'
                    ? error
                    : error && error.message
                        ? error.message
                        : undefined,
            });
        },
    }), ids = _g.ids, data = _g.data, total = _g.total, error = _g.error, loading = _g.loading, loaded = _g.loaded;
    var totalPages = Math.ceil(total / query.perPage) || 1;
    react_1.useEffect(function () {
        if (query.page <= 0 ||
            (!loading && query.page > 1 && ids.length === 0)) {
            // Query for a page that doesn't exist, set page to 1
            queryModifiers.setPage(1);
        }
        else if (!loading && query.page > totalPages) {
            // Query for a page out of bounds, set page to the last existing page
            // It occurs when deleting the last element of the last page
            queryModifiers.setPage(totalPages);
        }
    }, [loading, query.page, ids, queryModifiers, total, totalPages]);
    var currentSort = react_1.useMemo(function () { return ({
        field: query.sort,
        order: query.order,
    }); }, [query.sort, query.order]);
    var resourceName = translate("resources." + resource + ".name", {
        smart_count: 2,
        _: inflection_1.default.humanize(inflection_1.default.pluralize(resource)),
    });
    var defaultTitle = translate('ra.page.list', {
        name: resourceName,
    });
    return {
        basePath: basePath,
        currentSort: currentSort,
        data: data,
        defaultTitle: defaultTitle,
        displayedFilters: query.displayedFilters,
        error: error,
        exporter: exporter,
        filter: filter,
        filterValues: query.filterValues,
        hasCreate: hasCreate,
        hideFilter: queryModifiers.hideFilter,
        ids: ids,
        loaded: loaded || ids.length > 0,
        loading: loading,
        onSelect: selectionModifiers.select,
        onToggleItem: selectionModifiers.toggle,
        onUnselectItems: selectionModifiers.clearSelection,
        page: query.page,
        perPage: query.perPage,
        resource: resource,
        selectedIds: selectedIds,
        setFilters: queryModifiers.setFilters,
        setPage: queryModifiers.setPage,
        setPerPage: queryModifiers.setPerPage,
        setSort: queryModifiers.setSort,
        showFilter: queryModifiers.showFilter,
        total: total,
    };
};
exports.injectedProps = [
    'basePath',
    'currentSort',
    'data',
    'defaultTitle',
    'displayedFilters',
    'error',
    'exporter',
    'filterValues',
    'hasCreate',
    'hideFilter',
    'ids',
    'loading',
    'loaded',
    'onSelect',
    'onToggleItem',
    'onUnselectItems',
    'page',
    'perPage',
    'refresh',
    'resource',
    'selectedIds',
    'setFilters',
    'setPage',
    'setPerPage',
    'setSort',
    'showFilter',
    'total',
    'totalPages',
    'version',
];
/**
 * Select the props injected by the useListController hook
 * to be passed to the List children need
 * This is an implementation of pick()
 */
var getListControllerProps = function (props) {
    return exports.injectedProps.reduce(function (acc, key) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[key] = props[key], _a)));
    }, {});
};
exports.getListControllerProps = getListControllerProps;
/**
 * Select the props not injected by the useListController hook
 * to be used inside the List children to sanitize props injected by List
 * This is an implementation of omit()
 */
var sanitizeListRestProps = function (props) {
    return Object.keys(props)
        .filter(function (propName) { return !exports.injectedProps.includes(propName); })
        .reduce(function (acc, key) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[key] = props[key], _a)));
    }, {});
};
exports.sanitizeListRestProps = sanitizeListRestProps;
exports.default = useListController;
