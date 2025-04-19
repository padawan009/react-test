
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import App from "./App";
import { act } from '@testing-library/react';

describe('Тесты для формы', () => {
    let firstNameInput, surnameInput, emailInput, passwordInput, button;

    beforeEach(() => {
        globalThis.alert = vi.fn();
        render(<App />);
        firstNameInput = screen.getByLabelText(/^Name:$/i);
        surnameInput = screen.getByLabelText(/^Surname:$/i);
        emailInput = screen.getByLabelText(/e-mail:/i);
        passwordInput = screen.getByLabelText(/password:/i);
        button = screen.getByText(/^sign up$/i);
    });

    test('показывать ошибки валидации при пустых input', async () => {
        await act(async () => {  
            fireEvent.click(button);  
        });

        expect(screen.getByText(/^name is required!$/i)).toBeInTheDocument();
        expect(screen.getByText(/^surname is required!$/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required!/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required!/i)).toBeInTheDocument();
    });

    test('не показывать ошибки валидации, если все input заполнены корректно', async () => {
        await act(async () => {
            fireEvent.change(firstNameInput, { target: { value: "Andy" } });
            fireEvent.change(surnameInput, { target: { value: "White" } });
            fireEvent.change(emailInput, { target: { value: "andy.white@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "12909e12" } });
            fireEvent.click(button);
        });

        expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/not valid email/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/only letters/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/password must/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/password can't/i)).not.toBeInTheDocument();
    });    
    
    test('показывать ошибки валидации при неправильных (непустых) значениях', async () => {
        await act(async () => {
            fireEvent.change(firstNameInput, { target: { value: "889sad" } });
            fireEvent.change(surnameInput, { target: { value: "yh-ubu7" } });
            fireEvent.change(emailInput, { target: { value: "jakhd" } });
            fireEvent.change(passwordInput, { target: { value: "21" } });
            fireEvent.click(button);  
        });
    
        expect(await screen.findAllByText("Only letters, spaces, and hyphens are allowed!")).toHaveLength(2);
        expect(await screen.findByText("This is not valid email!")).toBeInTheDocument();
        expect(await screen.findByText("Password must be more than 4 characters!")).toBeInTheDocument();
    });
});
