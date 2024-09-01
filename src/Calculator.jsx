import React, {useState} from "react";

export default function Calculator() {
    const [input, setInput] = useState("0");
    const [output, setOutput] = useState("");
    const [phase, setPhase] = useState(false);
 
    function isOperator(symbol) {
        return /([-]|[+]|[/]|[*])/.test(symbol);
    }

    function isStarter(symbol) {
        return /[-123456789]/.test(symbol);
    }

    function isFuckedUp(expression) {
        return /([-]|[+]|[\/]|[*])([+]|[\/]|[*])/.test(expression);
    }

    function typeInput(value) {
       if (!phase) {
        if (isStarter(value)){
            setPhase(true);
            setInput(value);
        } else if (value === "."){
            setPhase(true);
            setInput(input => input += value); 
        } else return;
       } else { 
        if (output && isOperator(value)) {
            setInput(output + value);
            setOutput("");
        } else {
        if (value === ".") {
            const pieces = input.split(/([-]|[+]|[/]|[*])/g);
            if (pieces[pieces.length - 1].includes(".")) return;
            else setInput(input => input += value);
        }
        else 
        setInput(input => input += value);
       }}
    }

    function clear() {
       setInput("0");
       setOutput("");
       setPhase(false);
    }

    function fixInput(expression) {
      const regex = /([-]|[+]|[/]|[*]){2,}/g;
      let fixedExp = expression;

      const matches = expression.match(regex);
      const replacements = matches.map((match) => {
        const chars = match.split("");
        if (chars[chars.length - 1] === "-") return chars[chars.length - 2] + chars[chars.length - 1];
        else return chars[chars.length - 1];
      });
      for (let i = 0; i < matches.length; i++) {
        fixedExp = fixedExp.replace(matches[i], replacements[i]);
      };
      return fixedExp;
    }

    function evaluate() {
        let exp = (isFuckedUp(input)) ? fixInput(input)
: input;
        exp = exp.replace(/\s/g, "");
        console.log("expression: " + exp);
        console.log("result: " + eval(exp));
        setOutput(eval(exp));
    }

        return( <div id="calculator">
            <div id="display">
                <div id="output">{output}</div>
                <div id="input">{input}</div>
            </div>
            <div id="container">
                <button id="clear" onClick={clear}>C</button>
                <button id="divide" onClick={() => typeInput("/")}>/</button>
                <button id="multiply" onClick={() => typeInput("*")}>x</button>
                <button id="seven" onClick={() => typeInput("7")}>7</button>
                <button id="eight" onClick={() => typeInput("8")}>8</button>
                <button id="nine" onClick={() => typeInput("9")}>9</button>
                <button id="subtract" onClick={() => typeInput("-")}>-</button>
                <button id="four"  onClick={() => typeInput("4")}>4</button>
                <button id="five" onClick={() => typeInput("5")}>5</button>
                <button id="six" onClick={() => typeInput("6")}>6</button>
                <button id="add" onClick={() => typeInput("+")}>+</button>
                <button id="one" onClick={() => typeInput("1")}>1</button>
                <button id="two" onClick={() => typeInput("2")}>2</button>
                <button id="three" onClick={() => typeInput("3")}>3</button>
                <button id="zero" onClick={() => typeInput("0")}>0</button>
                <button id="decimal" onClick={() => typeInput(".")}>.</button>
                <button id="equals" onClick={evaluate}>=</button>
            </div>
        </div>
        );
}