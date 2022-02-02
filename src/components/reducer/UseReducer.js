
let localValues = JSON.parse(localStorage.getItem("cartList"));
export const initialState = localValues;

export const reducer = (state, action) => {
    if(action.type === "ADD_CART") {
        if(localValues) {
            let curStore = localValues.find(key => key.store_pr_id === action.payload.store_pr_id);
            if(JSON.stringify(curStore) !== JSON.stringify(action.payload)) {
                localValues = [action.payload, ...localValues];
                localStorage.setItem("cartList", JSON.stringify(localValues));
            }
        } else {
            localValues = [action.payload];
            localStorage.setItem("cartList", JSON.stringify(localValues));
        }
    }
    if(action.type === "REMOVE_CART") {
        localValues = localValues.filter(function( obj ) {
            return obj.store_pr_id !== action.payload.store_pr_id;
        });
        localStorage.setItem("cartList", JSON.stringify(localValues));
    }
    return localValues;
}