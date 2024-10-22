import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { Expense } from "../types/types";

test("adds expense to be over budget", () => {
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
        target: { value: "WE LOVE MAC HERE" },
    });
    fireEvent.change(costInput, {
        target: { value: 600 },
    });
    fireEvent.click(saveButton);
    
    fireEvent.change(nameInput, {
        target: { value: "WE HATE WINDOWS HERE" },
    });
    fireEvent.change(costInput, {
        target: { value: 400 },
    });
    fireEvent.click(saveButton);

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $-100")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $1100")).toBeInTheDocument();
});

test("adds expense to be over budget, then deletes to go under budget", () => {
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
        target: { value: "WE LOVE MAC HERE" },
    });
    fireEvent.change(costInput, {
        target: { value: 600 },
    });
    fireEvent.click(saveButton);
    
    fireEvent.change(nameInput, {
        target: { value: "WE HATE WINDOWS HERE" },
    });
    fireEvent.change(costInput, {
        target: { value: 400 },
    });
    fireEvent.click(saveButton);

    fireEvent.change(nameInput, {
        target: { value: "WE LOVE LINUX" },
    });
    fireEvent.change(costInput, {
        target: { value: 50 },
    });
    fireEvent.click(saveButton);

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $-150")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $1150")).toBeInTheDocument();

    let itemDel = screen.getByTestId("3d");
    fireEvent.click(itemDel);

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $-100")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $1100")).toBeInTheDocument();

    itemDel = screen.getByTestId("0d");
    fireEvent.click(itemDel);

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $0")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $1000")).toBeInTheDocument();

    itemDel = screen.getByTestId("2d");
    fireEvent.click(itemDel);

    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $400")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $600")).toBeInTheDocument();
});