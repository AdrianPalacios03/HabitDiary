import { create } from 'zustand'

interface ColorStore {
    color: string;
    setColor: (color: string) => void;
}

const useColorStore = create<ColorStore>((set) => ({
    color: '#8855e0',
    setColor: (color) => set({ color }),
}))

export default useColorStore;