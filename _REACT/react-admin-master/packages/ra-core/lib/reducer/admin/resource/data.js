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
exports.getRecord = exports.removeRecords = exports.addOneRecord = exports.addRecords = exports.addRecordsAndRemoveOutdated = exports.hideFetchedAt = void 0;
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var actions_1 = require("../../../actions");
var core_1 = require("../../../core");
var getFetchedAt_1 = __importDefault(require("../../../util/getFetchedAt"));
/**
 * Make the fetchedAt property non enumerable
 */
var hideFetchedAt = function (records) {
    Object.defineProperty(records, 'fetchedAt', {
        enumerable: false,
        configurable: false,
        writable: false,
    });
    return records;
};
exports.hideFetchedAt = hideFetchedAt;
/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
var addRecordsAndRemoveOutdated = function (newRecords, oldRecords) {
    if (newRecords === void 0) { newRecords = []; }
    var newRecordsById = {};
    newRecords.forEach(function (record) { return (newRecordsById[record.id] = record); });
    var newFetchedAt = getFetchedAt_1.default(newRecords.map(function (_a) {
        var id = _a.id;
        return id;
    }), oldRecords.fetchedAt);
    var records = { fetchedAt: newFetchedAt };
    Object.keys(newFetchedAt).forEach(function (id) {
        return (records[id] = newRecordsById[id]
            ? isEqual_1.default(newRecordsById[id], oldRecords[id])
                ? oldRecords[id] // do not change the record to avoid a redraw
                : newRecordsById[id]
            : oldRecords[id]);
    });
    return exports.hideFetchedAt(records);
};
exports.addRecordsAndRemoveOutdated = addRecordsAndRemoveOutdated;
/**
 * Add new records to the pool, without touching the other ones.
 */
var addRecords = function (newRecords, oldRecords) {
    if (newRecords === void 0) { newRecords = []; }
    var newRecordsById = __assign({}, oldRecords);
    newRecords.forEach(function (record) {
        newRecordsById[record.id] = isEqual_1.default(record, oldRecords[record.id])
            ? oldRecords[record.id]
            : record;
    });
    var updatedFetchedAt = getFetchedAt_1.default(newRecords.map(function (_a) {
        var id = _a.id;
        return id;
    }), oldRecords.fetchedAt);
    Object.defineProperty(newRecordsById, 'fetchedAt', {
        value: __assign(__assign({}, oldRecords.fetchedAt), updatedFetchedAt),
        enumerable: false,
    });
    return newRecordsById;
};
exports.addRecords = addRecords;
var addOneRecord = function (newRecord, oldRecords, date) {
    var _a, _b;
    if (date === void 0) { date = new Date(); }
    var newRecordsById = __assign(__assign({}, oldRecords), (_a = {}, _a[newRecord.id] = isEqual_1.default(newRecord, oldRecords[newRecord.id])
        ? oldRecords[newRecord.id] // do not change the record to avoid a redraw
        : newRecord, _a));
    return Object.defineProperty(newRecordsById, 'fetchedAt', {
        value: __assign(__assign({}, oldRecords.fetchedAt), (_b = {}, _b[newRecord.id] = date, _b)),
        enumerable: false,
    });
};
exports.addOneRecord = addOneRecord;
var includesNotStrict = function (items, element) {
    return items.some(function (item) { return item == element; });
}; // eslint-disable-line eqeqeq
/**
 * Remove records from the pool
 */
var removeRecords = function (removedRecordIds, oldRecords) {
    if (removedRecordIds === void 0) { removedRecordIds = []; }
    var records = Object.entries(oldRecords)
        .filter(function (_a) {
        var key = _a[0];
        return !includesNotStrict(removedRecordIds, key);
    })
        .reduce(function (obj, _a) {
        var _b;
        var key = _a[0], val = _a[1];
        return (__assign(__assign({}, obj), (_b = {}, _b[key] = val, _b)));
    }, {
        fetchedAt: {},
    });
    records.fetchedAt = Object.entries(oldRecords.fetchedAt)
        .filter(function (_a) {
        var key = _a[0];
        return !includesNotStrict(removedRecordIds, key);
    })
        .reduce(function (obj, _a) {
        var _b;
        var key = _a[0], val = _a[1];
        return (__assign(__assign({}, obj), (_b = {}, _b[key] = val, _b)));
    }, {});
    return exports.hideFetchedAt(records);
};
exports.removeRecords = removeRecords;
var initialState = exports.hideFetchedAt({ fetchedAt: {} });
var dataReducer = function (previousState, _a) {
    if (previousState === void 0) { previousState = initialState; }
    var payload = _a.payload, meta = _a.meta;
    if (meta && meta.optimistic) {
        if (meta.fetch === core_1.UPDATE) {
            var updatedRecord = __assign(__assign({}, previousState[payload.id]), payload.data);
            return exports.addOneRecord(updatedRecord, previousState);
        }
        if (meta.fetch === core_1.UPDATE_MANY) {
            var updatedRecords = payload.ids.map(function (id) { return (__assign(__assign({}, previousState[id]), payload.data)); });
            return exports.addRecordsAndRemoveOutdated(updatedRecords, previousState);
        }
        if (meta.fetch === core_1.DELETE) {
            return exports.removeRecords([payload.id], previousState);
        }
        if (meta.fetch === core_1.DELETE_MANY) {
            return exports.removeRecords(payload.ids, previousState);
        }
    }
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== actions_1.FETCH_END) {
        return previousState;
    }
    switch (meta.fetchResponse) {
        case core_1.GET_LIST:
            return exports.addRecordsAndRemoveOutdated(payload.data, previousState);
        case core_1.GET_MANY:
        case core_1.GET_MANY_REFERENCE:
            return exports.addRecords(payload.data, previousState);
        case core_1.UPDATE:
        case core_1.CREATE:
        case core_1.GET_ONE:
            return exports.addOneRecord(payload.data, previousState);
        default:
            return previousState;
    }
};
var getRecord = function (state, id) { return state[id]; };
exports.getRecord = getRecord;
exports.default = dataReducer;
