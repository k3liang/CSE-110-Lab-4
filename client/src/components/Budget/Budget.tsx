import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
    const { budget, setBudget } = useContext(AppContext);
    const [edit, setEdit] = useState(false);
    const [tempBudget, setTempBudget] = useState(budget);

    // Fetch budget on component mount
    useEffect(() => {
        loadBudget();
    }, []);

    // Function to load budget and handle errors
    const loadBudget = async () => {
        try {
            const serverBudget = await fetchBudget();
            setBudget(serverBudget);
            setTempBudget(serverBudget);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEdit(false);
        updateBudget(tempBudget);
        setBudget(tempBudget);
    };

    const updateTempBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(+e.target.value)) {
            if (+e.target.value >= 0) {
                setTempBudget(+e.target.value);
            }
        }
    };

    function EditButton() {
        return (
            <button
                onClick={() => {
                    setEdit(true);
                }}
                id={"EditButton"}
                className="btn btn-primary"
            >
                Edit
            </button>
        );
    }

    return !edit ? (
        <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
            <div>
                Budget: ${budget} <EditButton />
            </div>
        </div>
    ) : (
        <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
            <form onSubmit={(event) => onSubmit(event)}>
                <div className="row">
                    <label htmlFor="budget"></label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="budgetsetter"
                        value={tempBudget}
                        onChange={updateTempBudget}
                        data-testid="BUDGETINPUT"
                    ></input>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

/**
 * <div className="row">
                <div className="col-sm">
                    <label htmlFor="budget"></label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="budgetsetter"
                        value={tempBudget}
                        onChange={updateTempBudget}
                        data-testid="BUDGETINPUT"
                    ></input>
                </div>
                <div className="col-sm">
                    <button type="submit" className="btn btn-primary mt-3">
                        Save
                    </button>
                </div>
            </div>
 */

export default Budget;
