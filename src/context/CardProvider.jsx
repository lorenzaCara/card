import { createContext, useContext, useEffect, useState } from "react";

const CardContext = createContext();

const CardProvider = ({ children }) => {
    const [ cards, setCards ] = useState([]);
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);


    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/cards")
            .then(res => res.json())
            .then(cards => {
                console.log(cards);
                setCards(cards);
            })
            .catch(err => {
                console.error('error', err)
            })
    }, [])

    //get data
    function getDataCards(id) {
        fetch(import.meta.env.VITE_API_URL + '/cards?list_id=' + id)
        .then(res => res.json())
        .then(data => {
            setData(prev => {
                return [
                    ...prev.filter(oneData => !data.find(d => d.id == oneData.id)), 
                    ...data
                ];
            });
        })
    }

    //create data
    const createCard = (card) => {
        setLoading(false);

        fetch(import.meta.env.VITE_API_URL + "/cards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card), 
        })
        .then(res => res.json())
        .then(data => {
            setCards([...cards, data])
        })
        .catch(err => {
            console.error('Error:', err);
        })
    }

    //update data
    const updateCard = (card) => {
        setLoading(false);

        fetch(import.meta.env.VITE_API_URL + "/cards/" + card.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(card),
        })
        .then(res => res.json())
        .then(updatedCard => {
            console.log('Updated card:', updatedCard);
            setCards(prevCards => prevCards.map(prevCard => prevCard.id === updatedCard.id ? updatedCard : prevCard))
        })
        .catch(err => {
            console.log('Error:', err)
        })
    }

    //delete card
    const deleteCard = (card) => {
        setLoading(false);
        fetch(import.meta.env.VITE_API_URL + "/cards/" + card.id, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(deletedCard => {
            setCards(prev => prev.filter(item => item.id !== deletedCard.id));
        })
        .catch(err => {
            console.log('Error:', err);
            
        })
    }

    return <CardContext.Provider value={{
        cards,
        data,
        loading,
        createCard,
        deleteCard,
        updateCard,
        getDataCards
    }}>
    { children }
    </CardContext.Provider>
}
export default CardProvider;

export function useCard() {
    return useContext(CardContext)
}