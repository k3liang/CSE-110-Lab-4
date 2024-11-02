import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { fetchBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);

  // Fetch budget on component mount
  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load budget and handle errors
    const loadBudget = async () => {
    try {
      const serverBudget = await fetchBudget();
      setBudget(serverBudget);
    } catch (err: any) {
      console.log(err.message);
    }
    };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div>
    </div>
  );
};

export default Budget;
