import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import response from "./data.json";

export default function App() {
  const [state, setState] = useState({});

  useEffect(() => {
    response.map((resp) =>
      setState((state) => ({ ...state, [resp.label]: resp.value }))
    );
    return () => {};
  }, []);

  const handleChange = (e, field) => {
    setState({
      ...state,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div className={styles.App}>
      <form onSubmit={handleSubmit}>
        {response.map((resp) => (
          <div key={resp.id} className={styles.container}>
            <label className={styles.label}>{resp.label}</label>
            {(() => {
              if (resp.type === "date") {
                return (
                  <>
                    <input
                      type="date"
                      value={state[resp.label]}
                      required={resp.isRequired}
                      onChange={(e) => {
                        handleChange(e, resp.label);
                      }}
                    />
                  </>
                );
              } else if (resp.type === "dropdown") {
                return (
                  <>
                    <select
                      onChange={(e) => {
                        handleChange(e, resp.label);
                      }}
                    >
                      {resp.items.map((item, index) => (
                        <>
                          <option
                            key={index}
                            value={item.value}
                            className={styles.options}
                          >
                            {item.text}
                          </option>
                        </>
                      ))}
                    </select>
                  </>
                );
              } else if (resp.type === "number") {
                return (
                  <>
                    <input
                      type="number"
                      readOnly={resp.isReadonly}
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e, resp.label);
                      }}
                      value={state[resp.label]}
                      required={resp.isRequired}
                    />
                    {resp.unit ? (
                      <span className={styles.spacing}>{resp.unit}</span>
                    ) : (
                      ""
                    )}
                  </>
                );
              }
            })()}
          </div>
        ))}
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
