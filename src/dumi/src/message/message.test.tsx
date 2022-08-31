import { queryByText, screen, waitFor, waitForElementToBeRemoved, } from "@testing-library/react";
import Message from "./Message";
test("message component no duration input ", async () => {
    Message.success("this is a test message")
    expect(screen.queryByText('this is a test message')).toBeVisible()
    await waitFor(() => {
        expect(screen.queryByText('this is a test message')).not.toBeInTheDocument()
    }, { timeout: 4000 })

})
jest.setTimeout(7000)
test("message component has duration input", async () => {
    let duration = 4;
    Message.error("this is a test message", duration)
    await waitFor(() => {
        expect(screen.getByText('this is a test message')).toBeInTheDocument()
    })
    await waitFor(() => {
        expect(screen.queryByText("this is a test message")).not.toBeInTheDocument()
    }, { timeout: 5000 })
})