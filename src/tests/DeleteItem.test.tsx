import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { Expense } from "../types/types";

test("adds expense then delete it", () => {
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

    const itemDel = screen.getByTestId("0d");
    fireEvent.click(itemDel);

    expect(screen.queryByTestId("0n")).toBeNull();
    expect(screen.queryByTestId("0c")).toBeNull();
    expect(screen.queryByTestId("0d")).toBeNull();
    expect(list.innerHTML).toBe("");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
});

test("adds three expenses then deletes them all", () => {
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

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS COOL" },
    });
    fireEvent.change(costInput, {
        target: { value: 200 },
    });
    fireEvent.click(saveButton);

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS AMAZING" },
    });
    fireEvent.change(costInput, {
        target: { value: 500 },
    });
    fireEvent.click(saveButton);

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $200")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $800")).toBeInTheDocument();

    let itemDel = screen.getByTestId("1d");
    fireEvent.click(itemDel);

    expect(screen.queryByTestId("1n")).toBeNull();
    expect(screen.queryByTestId("1c")).toBeNull();
    expect(screen.queryByTestId("1d")).toBeNull();
    expect(screen.queryByText("COBLENZ IS COOL")).toBeNull();

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $400")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $600")).toBeInTheDocument();

    itemDel = screen.getByTestId("0d");
    fireEvent.click(itemDel);

    expect(screen.queryByTestId("0n")).toBeNull();
    expect(screen.queryByTestId("0c")).toBeNull();
    expect(screen.queryByTestId("0d")).toBeNull();
    expect(screen.queryByText("COBLENZ IS AWESOME")).toBeNull();

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $500")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $500")).toBeInTheDocument();

    itemDel = screen.getByTestId("2d");
    fireEvent.click(itemDel);

    expect(screen.queryByTestId("2n")).toBeNull();
    expect(screen.queryByTestId("2c")).toBeNull();
    expect(screen.queryByTestId("2d")).toBeNull();
    expect(screen.queryByText("COBLENZ IS AMAZING")).toBeNull();
    expect(list.innerHTML).toBe("");

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
});

test("adds then delete then add then delete", () => {
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

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS A PROF" },
    });
    fireEvent.change(costInput, {
        target: { value: 300 },
    });
    fireEvent.click(saveButton);

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $600")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $400")).toBeInTheDocument();

    let itemDel = screen.getByTestId("0d");
    fireEvent.click(itemDel);

    expect(screen.queryByTestId("0n")).toBeNull();
    expect(screen.queryByTestId("0c")).toBeNull();
    expect(screen.queryByTestId("0d")).toBeNull();
    expect(screen.queryByText("COBLENZ IS AWESOME")).toBeNull();

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $700")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $300")).toBeInTheDocument();

    fireEvent.change(nameInput, {
        target: { value: "COBLENZ IS THE GOAT" },
    });
    fireEvent.change(costInput, {
        target: { value: 500 },
    });
    fireEvent.click(saveButton);
    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $200")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $800")).toBeInTheDocument();

    itemDel = screen.getByTestId("1d");
    fireEvent.click(itemDel);

    expect(screen.queryByTestId("1n")).toBeNull();
    expect(screen.queryByTestId("1c")).toBeNull();
    expect(screen.queryByTestId("1d")).toBeNull();
    expect(screen.queryByText("COBLENZ IS A PROF")).toBeNull();

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $500")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $500")).toBeInTheDocument();
});