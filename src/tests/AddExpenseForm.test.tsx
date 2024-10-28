import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { Expense } from "../types/types";

test("adds no expense", () => {
    render(<App />);
    const list = screen.getByTestId("LIST");
    expect(list).toBeInTheDocument();
    expect(list.innerHTML).toBe("");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
});

test("adds one expense", () => {
    render(<App />);
    const list = screen.getByTestId("LIST");
    const nameInput = screen.getByTestId("NAMEINPUT");
    const costInput = screen.getByTestId("COSTINPUT");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS AWESOME" },
    });
    fireEvent.change(costInput, {
        target: { value: 100 },
    });
    fireEvent.click(saveButton);
    
    
    const itemName = screen.getByTestId("0n");
    const itemCost = screen.getByTestId("0c");
    expect(itemName.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost.innerHTML).toBe("$100");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $900")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $100")).toBeInTheDocument();
})

test("adds three expenses", () => {
    render(<App />);
    const list = screen.getByTestId("LIST");
    const nameInput = screen.getByTestId("NAMEINPUT");
    const costInput = screen.getByTestId("COSTINPUT");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS AWESOME" },
    });
    fireEvent.change(costInput, {
        target: { value: 100 },
    });
    fireEvent.click(saveButton);
    
    const itemName1 = screen.getByTestId("0n");
    const itemCost1 = screen.getByTestId("0c");
    expect(itemName1.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost1.innerHTML).toBe("$100");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $900")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $100")).toBeInTheDocument();

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS THE BEST" },
    });
    fireEvent.change(costInput, {
        target: { value: 200 },
    });
    fireEvent.click(saveButton);
    const itemName2 = screen.getByTestId("1n");
    const itemCost2 = screen.getByTestId("1c");

    expect(itemName1.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost1.innerHTML).toBe("$100");
    expect(itemName2.innerHTML).toBe("COBLENZ IS THE BEST");
    expect(itemCost2.innerHTML).toBe("$200");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $700")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $300")).toBeInTheDocument();

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS THE BEST OF THE BEST" },
    });
    fireEvent.change(costInput, {
        target: { value: 500 },
    });
    fireEvent.click(saveButton);
    const itemName3 = screen.getByTestId("2n");
    const itemCost3 = screen.getByTestId("2c");

    expect(itemName1.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost1.innerHTML).toBe("$100");
    expect(itemName2.innerHTML).toBe("COBLENZ IS THE BEST");
    expect(itemCost2.innerHTML).toBe("$200");
    expect(itemName3.innerHTML).toBe("COBLENZ IS THE BEST OF THE BEST");
    expect(itemCost3.innerHTML).toBe("$500");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $200")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $800")).toBeInTheDocument();
})

test("adds three duplicate expenses", () => {
    render(<App />);
    const list = screen.getByTestId("LIST");
    const nameInput = screen.getByTestId("NAMEINPUT");
    const costInput = screen.getByTestId("COSTINPUT");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS AWESOME" },
    });
    fireEvent.change(costInput, {
        target: { value: 100 },
    });
    fireEvent.click(saveButton);
    
    const itemName1 = screen.getByTestId("0n");
    const itemCost1 = screen.getByTestId("0c");
    expect(itemName1.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost1.innerHTML).toBe("$100");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $900")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $100")).toBeInTheDocument();

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS AWESOME" },
    });
    fireEvent.change(costInput, {
        target: { value: 100 },
    });
    fireEvent.click(saveButton);
    const itemName2 = screen.getByTestId("1n");
    const itemCost2 = screen.getByTestId("1c");

    expect(itemName1.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost1.innerHTML).toBe("$100");
    expect(itemName2.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost2.innerHTML).toBe("$100");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $800")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $200")).toBeInTheDocument();

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS AWESOME" },
    });
    fireEvent.change(costInput, {
        target: { value: 100 },
    });
    fireEvent.click(saveButton);
    const itemName3 = screen.getByTestId("2n");
    const itemCost3 = screen.getByTestId("2c");

    expect(itemName1.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost1.innerHTML).toBe("$100");
    expect(itemName2.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost2.innerHTML).toBe("$100");
    expect(itemName3.innerHTML).toBe("COBLENZ IS AWESOME");
    expect(itemCost3.innerHTML).toBe("$100");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $700")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $300")).toBeInTheDocument();
})
