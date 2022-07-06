import FieldContext from "./FieldContext";
function Form({children, form}) {
    return (
        <form>
            <FieldContext.Provider value={form} >
                {children}
            </FieldContext.Provider>
        </form>
    );
}

export default Form;