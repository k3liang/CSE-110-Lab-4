import React, {
    useState,
    useContext,
    ReactElement,
    ReactHTMLElement,
} from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
const AddExpenseForm = () => {
    // Exercise: Consume the AppContext here
    const { expenses, setExpenses } = useContext(AppContext);

    // Exercise: Create name and cost to state variables
    const [name, setName] = useState("");
    const [cost, setCost] = useState(0);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Exercise: Add add new expense to expenses context array
        // const newExpense : Expense = { id: "string", name: name, cost: cost};

        setExpenses((prevExpenses) =>
            prevExpenses.length > 0
                ? prevExpenses.concat([
                      {
                          id: prevExpenses[prevExpenses.length - 1].id + 1 + "",
                          name: name,
                          cost: cost,
                      },
                  ])
                : prevExpenses.concat([{ id: 0 + "", name: name, cost: cost }])
        );
    };

    const updateCost = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(+e.target.value))
            setCost(+e.target.value);
    };

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <div className="row">
                <div className="col-sm">
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="col-sm">
                    <label htmlFor="cost">Cost</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="cost"
                        value={cost}
                        onChange={updateCost}
                    ></input>
                </div>
                <div className="col-sm">
                    <button type="submit" className="btn btn-primary mt-3">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddExpenseForm;
