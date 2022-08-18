import { createContext } from "react";
type ExpandKeysContextProps = {
    expandKeys: string[],
    setExpandKeys: (arr: string[]) => void
}
const ExpandKeysContext = createContext<ExpandKeysContextProps>(
    {
        expandKeys: [],
        setExpandKeys: (arr: string[]) => { }
    });
export default ExpandKeysContext