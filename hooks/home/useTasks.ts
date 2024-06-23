import { useEffect, useState } from "react";
import { getDayInfo } from "@/database/getDayInfo";
import { setDayInfo } from "@/database/setDayInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
  

const defaultCheckedFields: any = {}

const useTask = () => {
    const [taskDate, setTaskDate] = useState<Date>();
    const [checkedFields, setCheckedFields] = useState(defaultCheckedFields)
    const [isSaving, setIsSaving] = useState(false)


    const getDayData = async () => {
        if (!taskDate) return
        await getDayInfo(taskDate)
        .then((data: any) => {
            if (data) {
                setCheckedFields(data) 
            }else{
                setDayInfo(taskDate, defaultCheckedFields)
                setCheckedFields(defaultCheckedFields) 
            }
        })
    }

    useEffect(() => {                
        const date = new Date();
        setTaskDate(date) 
    }, [])

    useEffect(() => {
        getDayData()
    }, [taskDate])
    
    
    
    const onSaveClick = () => {
        setIsSaving(true);
        setDayInfo(taskDate!, checkedFields).then(() => {
            setIsSaving(false)
        })
    }

    const onCheckChange = (field: string, feeling?: string) => {
        if (feeling) {
            setCheckedFields({...checkedFields, feeling})
            return
        }
        setCheckedFields({...checkedFields, [field]: !checkedFields[field as any]})
    }

    return {
        taskDate,
        setTaskDate,
        checkedFields,
        onSaveClick,
        onCheckChange,
        isSaving
    }
}

export default useTask;