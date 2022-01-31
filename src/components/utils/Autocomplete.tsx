import React, {useState} from 'react';
import Autosuggest from 'react-autosuggest';

interface AutocompleteProps {
    suggestions: string[]
    onChange: Function
}

const Autocomplete = (props: AutocompleteProps) => {
    const [value, setValue] = useState("");
    const [currSuggestions, setCurrSuggestions] = useState(props.suggestions);
    const levenshtein = require("js-levenshtein");
    const getSuggestions = (value: string) => {
        const inputValue = value?.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? props.suggestions : props.suggestions.filter(elem =>
            elem.trim().toLowerCase().includes(inputValue)
        ).sort((a:string, b:string) => levenshtein(b, value) - levenshtein(a, value))
            .slice(0, 5);
    };

    const onSuggestionsFetchRequested = (request: any) => {
        setCurrSuggestions(getSuggestions(request.value));
    };

    const onSuggestionsClearRequested = () => {
        setCurrSuggestions([]);
    };

    const onSuggestionSelected = (e: any, suggestion: any) =>
    {
        setValue(suggestion.suggestion);
        props.onChange(suggestion.suggestion);
    }

    const renderSuggestion = (suggestion: string) => (
        <div className="m-0 suggestion">
            {suggestion}
        </div>
    );

    const inputProps = {
        value,
        onChange: (e: any) => {
            setValue(e.target.value)
            props.onChange(e.target.value)
        },
        className: "input-border",
    };

    return (
        <Autosuggest
            suggestions={currSuggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={(s: string) => {console.log(s); return s;}}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    )
}

export default Autocomplete