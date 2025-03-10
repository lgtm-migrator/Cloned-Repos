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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var useDataProvider_1 = __importDefault(require("./useDataProvider"));
var useVersion_1 = __importDefault(require("../controller/useVersion"));
var getFetchType_1 = __importDefault(require("./getFetchType"));
var hooks_1 = require("../util/hooks");
var queriesThisTick = {};
/**
 * Default cache selector. Allows to cache responses by default.
 *
 * By default, custom queries are dispatched as a CUSTOM_QUERY Redux action.
 * The useDataProvider hook dispatches a CUSTOM_QUERY_SUCCESS when the response
 * comes, and the customQueries reducer stores the result in the store.
 * This selector reads the customQueries store and acts as a response cache.
 */
var defaultDataSelector = function (query) { return function (state) {
    var key = JSON.stringify(__assign(__assign({}, query), { type: getFetchType_1.default(query.type) }));
    return state.admin.customQueries[key]
        ? state.admin.customQueries[key].data
        : undefined;
}; };
var defaultTotalSelector = function (query) { return function (state) {
    var key = JSON.stringify(__assign(__assign({}, query), { type: getFetchType_1.default(query.type) }));
    return state.admin.customQueries[key]
        ? state.admin.customQueries[key].total
        : null;
}; };
var defaultIsDataLoaded = function (data) { return data !== undefined; };
/**
 * Fetch the data provider through Redux, return the value from the store.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from response], total: [total from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * This hook will return the cached result when called a second time
 * with the same parameters, until the response arrives.
 *
 * @param {Object} query
 * @param {string} query.type The verb passed to th data provider, e.g. 'getList', 'getOne'
 * @param {string} query.resource A resource name, e.g. 'posts', 'comments'
 * @param {Object} query.payload The payload object, e.g; { post_id: 12 }
 * @param {Object} options
 * @param {string} options.action Redux action type
 * @param {Function} options.onSuccess Side effect function to be executed upon success, e.g. () => refresh()
 * @param {Function} options.onFailure Side effect function to be executed upon failure, e.g. (error) => notify(error.message)
 * @param {Function} dataSelector Redux selector to get the result. Required.
 * @param {Function} totalSelector Redux selector to get the total (optional, only for LIST queries)
 * @param {Function} isDataLoaded
 *
 * @returns The current request state. Destructure as { data, total, error, loading, loaded }.
 *
 * @example
 *
 * import { useQueryWithStore } from 'react-admin';
 *
 * const UserProfile = ({ record }) => {
 *     const { data, loading, error } = useQueryWithStore(
 *         {
 *             type: 'getOne',
 *             resource: 'users',
 *             payload: { id: record.id }
 *         },
 *         {},
 *         state => state.admin.resources.users.data[record.id]
 *     );
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <div>User {data.username}</div>;
 * };
 */
var useQueryWithStore = function (query, options, dataSelector, totalSelector, isDataLoaded) {
    if (options === void 0) { options = { action: 'CUSTOM_QUERY' }; }
    if (dataSelector === void 0) { dataSelector = defaultDataSelector(query); }
    if (totalSelector === void 0) { totalSelector = defaultTotalSelector(query); }
    if (isDataLoaded === void 0) { isDataLoaded = defaultIsDataLoaded; }
    var type = query.type, resource = query.resource, payload = query.payload;
    var version = useVersion_1.default(); // used to allow force reload
    var requestSignature = JSON.stringify({ query: query, options: options, version: version });
    var requestSignatureRef = react_1.useRef(requestSignature);
    var data = react_redux_1.useSelector(dataSelector);
    var total = react_redux_1.useSelector(totalSelector);
    var _a = hooks_1.useSafeSetState({
        data: data,
        total: total,
        error: null,
        loading: true,
        loaded: isDataLoaded(data),
    }), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        if (requestSignatureRef.current !== requestSignature) {
            // request has changed, reset the loading state
            requestSignatureRef.current = requestSignature;
            setState({
                data: data,
                total: total,
                error: null,
                loading: true,
                loaded: isDataLoaded(data),
            });
        }
        else if (!isEqual_1.default(state.data, data) || state.total !== total) {
            // the dataProvider response arrived in the Redux store
            if (typeof total !== 'undefined' && isNaN(total)) {
                console.error('Total from response is not a number. Please check your dataProvider or the API.');
            }
            else {
                setState(function (prevState) { return (__assign(__assign({}, prevState), { data: data,
                    total: total, loaded: true, loading: false })); });
            }
        }
    }, [
        data,
        requestSignature,
        setState,
        state.data,
        state.total,
        total,
        isDataLoaded,
    ]);
    var dataProvider = useDataProvider_1.default();
    react_1.useEffect(function () {
        // When several identical queries are issued during the same tick,
        // we only pass one query to the dataProvider.
        // To achieve that, the closure keeps a list of dataProvider promises
        // issued this tick. Before calling the dataProvider, this effect
        // checks if another effect has already issued a similar dataProvider
        // call.
        if (!queriesThisTick.hasOwnProperty(requestSignature)) {
            queriesThisTick[requestSignature] = new Promise(function (resolve) {
                dataProvider[type](resource, payload, options)
                    .then(function () {
                    // We don't care about the dataProvider response here, because
                    // it was already passed to SUCCESS reducers by the dataProvider
                    // hook, and the result is available from the Redux store
                    // through the data and total selectors.
                    // In addition, if the query is optimistic, the response
                    // will be empty, so it should not be used at all.
                    if (requestSignature !== requestSignatureRef.current) {
                        resolve(undefined);
                    }
                    resolve({
                        error: null,
                        loading: false,
                        loaded: true,
                    });
                })
                    .catch(function (error) {
                    if (requestSignature !== requestSignatureRef.current) {
                        resolve(undefined);
                    }
                    resolve({
                        error: error,
                        loading: false,
                        loaded: false,
                    });
                });
            });
            // cleanup the list on next tick
            setTimeout(function () {
                delete queriesThisTick[requestSignature];
            }, 0);
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var newState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queriesThisTick[requestSignature]];
                    case 1:
                        newState = _a.sent();
                        if (newState)
                            setState(function (state) { return (__assign(__assign({}, state), newState)); });
                        return [2 /*return*/];
                }
            });
        }); })();
        // deep equality, see https://github.com/facebook/react/issues/14476#issuecomment-471199055
    }, [requestSignature]); // eslint-disable-line
    return state;
};
exports.default = useQueryWithStore;
