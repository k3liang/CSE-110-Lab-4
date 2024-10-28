import React, {
    useState,
    useContext,
    ReactElement,
    ReactHTMLElement,
} from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";
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

        const newExpense:Expense = expenses.length > 0
        ? 
              {
                  id:
                      +expenses[expenses.length - 1].id +
                      1 +
                      "",
                  description: name,
                  cost: cost,
              }
        : { id: 0 + "", description: name, cost: cost };
        createExpense(newExpense);

        setExpenses((prevExpenses) =>
            prevExpenses.length > 0
                ? prevExpenses.concat([
                      {
                          id:
                              +prevExpenses[prevExpenses.length - 1].id +
                              1 +
                              "",
                          description: name,
                          cost: cost,
                      },
                  ])
                : prevExpenses.concat([{ id: 0 + "", description: name, cost: cost }])
        );
    };

    const updateCost = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(+e.target.value)) {
            if (+e.target.value >= 0) {
                setCost(+e.target.value);
            }
        }
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
                        data-testid="NAMEINPUT"
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
                        data-testid="COSTINPUT"
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
