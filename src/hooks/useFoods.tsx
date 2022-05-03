import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { string } from "yup";
import api from "../services/api";

interface Food {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
}

interface FoodsProviderProps {
    children: ReactNode;
}

interface FoodsContextData {
    foods: Food[];
    setFoods: (foods:Food[]) => void
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData)

export function FoodsProvider({ children } : FoodsProviderProps) {
    const [foods, setFoods] = useState<Food[]>([])

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/foods')
            setFoods(response.data)
          }

        loadProducts() 
    }, [])

    return (
        <FoodsContext.Provider value={{foods, setFoods}}>
            {children} 
        </FoodsContext.Provider>
    )

}

export function useFoods() {
    const context = useContext(FoodsContext)

    return context
}