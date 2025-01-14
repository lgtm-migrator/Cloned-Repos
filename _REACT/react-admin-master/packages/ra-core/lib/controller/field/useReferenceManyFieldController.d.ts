import { Record, SortPayload, RecordMap } from '../../types';
import { ListControllerProps } from '../useListController';
interface Options {
    basePath: string;
    data?: RecordMap;
    filter?: any;
    ids?: any[];
    loaded?: boolean;
    page?: number;
    perPage?: number;
    record?: Record;
    reference: string;
    resource: string;
    sort?: SortPayload;
    source?: string;
    target: string;
    total?: number;
}
/**
 * Fetch reference records, and return them when available
 *
 * The reference prop should be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 *
 * const { loaded, referenceRecord, resourceLinkPath } = useReferenceManyFieldController({
 *     resource
 *     reference: 'users',
 *     record: {
 *         userId: 7
 *     }
 *     target: 'comments',
 *     source: 'userId',
 *     basePath: '/comments',
 *     page: 1,
 *     perPage: 25,
 * });
 *
 * @param {Object} props
 * @param {string} props.resource The current resource name
 * @param {string} props.reference The linked resource name
 * @param {Object} props.record The current resource record
 * @param {string} props.target The target resource key
 * @param {Object} props.filter The filter applied on the recorded records list
 * @param {string} props.source The key of the linked resource identifier
 * @param {string} props.basePath basepath to current resource
 * @param {number} props.page the page number
 * @param {number} props.perPage the number of item per page
 * @param {Object} props.sort the sort to apply to the referenced records
 *
 * @returns {ReferenceManyProps} The reference many props
 */
declare const useReferenceManyFieldController: (props: Options) => ListControllerProps;
export default useReferenceManyFieldController;
