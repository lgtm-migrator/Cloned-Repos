interface StringMap {
    [key: string]: StringMap | string | undefined;
}
export interface TranslationMessages extends StringMap {
    ra: {
        action: {
            [key: string]: StringMap | string;
            add_filter: string;
            add: string;
            back: string;
            bulk_actions: string;
            cancel: string;
            clear_input_value: string;
            clone: string;
            confirm: string;
            create: string;
            delete: string;
            edit: string;
            export: string;
            list: string;
            refresh: string;
            remove_filter: string;
            remove: string;
            save: string;
            search: string;
            show: string;
            sort: string;
            undo: string;
            unselect: string;
            expand: string;
            close: string;
            open_menu: string;
            close_menu: string;
        };
        boolean: {
            [key: string]: StringMap | string;
            true: string;
            false: string;
            null: string;
        };
        page: {
            [key: string]: StringMap | string;
            create: string;
            dashboard: string;
            edit: string;
            error: string;
            list: string;
            loading: string;
            not_found: string;
            show: string;
            empty: string;
            invite: string;
        };
        input: {
            [key: string]: StringMap | string;
            file: {
                [key: string]: StringMap | string;
                upload_several: string;
                upload_single: string;
            };
            image: {
                [key: string]: StringMap | string;
                upload_several: string;
                upload_single: string;
            };
            references: {
                [key: string]: StringMap | string;
                all_missing: string;
                many_missing: string;
                single_missing: string;
            };
            password: {
                [key: string]: StringMap | string;
                toggle_visible: string;
                toggle_hidden: string;
            };
        };
        message: {
            [key: string]: StringMap | string;
            about: string;
            are_you_sure: string;
            bulk_delete_content: string;
            bulk_delete_title: string;
            delete_content: string;
            delete_title: string;
            details: string;
            error: string;
            invalid_form: string;
            loading: string;
            no: string;
            not_found: string;
            yes: string;
            unsaved_changes: string;
        };
        navigation: {
            [key: string]: StringMap | string;
            no_results: string;
            no_more_results: string;
            page_out_of_boundaries: string;
            page_out_from_end: string;
            page_out_from_begin: string;
            page_range_info: string;
            page_rows_per_page: string;
            next: string;
            prev: string;
            skip_nav: string;
        };
        sort: {
            sort_by: string;
            ASC: string;
            DESC: string;
        };
        auth: {
            [key: string]: StringMap | string;
            auth_check_error: string;
            user_menu: string;
            username: string;
            password: string;
            sign_in: string;
            sign_in_error: string;
            logout: string;
        };
        notification: {
            [key: string]: StringMap | string;
            updated: string;
            created: string;
            deleted: string;
            bad_item: string;
            item_doesnt_exist: string;
            http_error: string;
            data_provider_error: string;
            i18n_error: string;
            canceled: string;
            logged_out: string;
        };
        validation: {
            [key: string]: StringMap | string;
            required: string;
            minLength: string;
            maxLength: string;
            minValue: string;
            maxValue: string;
            number: string;
            email: string;
            oneOf: string;
            regex: string;
        };
    };
}
export {};
