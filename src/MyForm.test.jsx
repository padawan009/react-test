import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import { MyForm } from './MyForm'

describe('Тесты для формы', () => {
    render(<MyForm />);

    test('показывать ошибки валидации при пустых input', () => {
        const button = screen.getByText(/sign up/i);
        fireEvent.click(button);

        expect(screen.getByText(/name is required!/i)).toBeInTheDocument();
        expect(screen.getByText(/surname is required!/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required!/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required!/i)).toBeInTheDocument();
    })

    test('показывать ошибки валидации при неправильных (непустых) значениях', () => {
        const firstNameInput = screen.getByLabelText(/name:/i);
        const surnameInput = screen.getByLabelText(/surname:/i);
        const emailInput = screen.getByLabelText(/email:/i);
        const passwordInput = screen.getByLabelText(/password:/i);

        fireEvent.change(firstNameInput, {target: {value: "889sad"}});
        fireEvent.change(surnameInput, {target: {value: "-ролф"}});
        fireEvent.change(emailInput, {target: {value: "jakhd"}});
        fireEvent.change(passwordInput, {target: {value: "21"}});
        
        expect(screen.getByText(/Only letters, spaces, and hyphens are allowed!/i)).toBeInTheDocument();
        expect(screen.getByText(/This is not valid email!/i)).toBeInTheDocument();
        expect(screen.getByText(/Password must be more than 4 characters!/i)).toBeInTheDocument();
        
        fireEvent.change(firstNameInput, {target: {value: "sa+d"}});
        fireEvent.change(surnameInput, {target: {value: "hkqwd89"}});
        fireEvent.change(emailInput, {target: {value: "jakhd@jk"}});
        fireEvent.change(passwordInput, {target: {value: "218719122eed"}});

        expect(screen.getByText(/Only letters, spaces, and hyphens are allowed!/i)).toBeInTheDocument();
        expect(screen.getByText(/This is not valid email!/i)).toBeInTheDocument();
        expect(screen.getByText(/Password can't be more than 10 characters!/i)).toBeInTheDocument();
    })

    test('не показывать ошибки валидации, если все input заполнены корректно', () => {
        const firstNameInput = screen.getByLabelText(/name:/i);
        const surnameInput = screen.getByLabelText(/surname:/i);
        const emailInput = screen.getByLabelText(/email:/i);
        const passwordInput = screen.getByLabelText(/password:/i);

        fireEvent.change(firstNameInput, {target: {value: "889sad"}});
        fireEvent.change(surnameInput, {target: {value: "-ролф"}});
        fireEvent.change(emailInput, {target: {value: "jakhd"}});
        fireEvent.change(passwordInput, {target: {value: "21"}});
        
        expect(screen.getByText(/Only letters, spaces, and hyphens are allowed!/i)).toBeInTheDocument();
        expect(screen.getByText(/This is not valid email!/i)).toBeInTheDocument();
        expect(screen.getByText(/Password must be more than 4 characters!/i)).toBeInTheDocument();
    })
})