import { type StoreGeneric, storeToRefs } from 'pinia';

export const useStoreAdapter = <T extends StoreGeneric>(store: T) => {
    const storeRefs = storeToRefs(store);

    return {
        ...store,
        ...storeRefs
    };
};
