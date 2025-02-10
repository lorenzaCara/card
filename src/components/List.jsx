import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Fragment, useId, useState } from "react"
import ListItem from "./ListItem"
import { Input } from "./ui/input"

const List = ({list}) => {

    const items = Array.from(new Array(10)).map((item, index) => {
        return { id: useId(), label: 'item ' + index, checked: index % 2 === 0 }
    });

    const [todos, setTodos] = useState(items);
    const [todoLabel, setTodoLabel] = useState("");

    const onCheck = (id, value) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {
                    id: todo.id,
                    label: todo.label,
                    checked: value,
                }
            } else {
                return todo;
            }
        }));
    }

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const updateItem = (item) => {
        setTodos(todos.map(todo => todo.id === item.id ? item : todo));
    }

    return (
        <Card className="break-inside-avoid">
            <CardHeader>
                <CardTitle>{list.title}</CardTitle>
                <CardDescription>{list.description}</CardDescription>
            </CardHeader>
            <CardContent className="gap-4 flex flex-col">
                <form onSubmit={e => {
                    e.preventDefault();
                    setTodos([{ id: todoLabel, label: todoLabel, checked: false }, ...todos]);
                    setTodoLabel("");
                }}>
                    <Input
                        name="todoLabel"
                        value={todoLabel}
                        onChange={(e) => setTodoLabel(e.target.value)}
                    />
                </form>
                {todos.filter(item => !item.checked).map(item => (
                    <ListItem
                        key={item.id}
                        item={item}
                        onCheck={onCheck}
                        removeTodo={removeTodo}
                        onItemChange={updateItem}
                    />
                ))}
                <Accordion type="single" collapsible>
                    <AccordionItem className="border-none" value="item-1">
                        <AccordionTrigger>Completati</AccordionTrigger>
                        <AccordionContent className="gap-4 flex flex-col">
                            {todos.filter(item => item.checked).map(item => (
                                // il componente Fragment è la versione esplicita di <></>
                                // e ci da la possibilità di usare la key senza aggiungere
                                // un div genitore. NB. va importato da react.
                                // in generare il fragment ci permette di tornare più elementi
                                // html in uno, cosa richiesta da jsx.
                                <Fragment key={item.id}>
                                <ListItem
                                    key={item.id}
                                    item={item}
                                    onCheck={onCheck}
                                    removeTodo={removeTodo}
                                    onItemChange={updateItem}
                                />
                                </Fragment>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

    )
}

export default List