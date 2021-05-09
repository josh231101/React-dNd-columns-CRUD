import React from "react";
import ReactDOM from "react-dom";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";
import { message } from "antd";
import "./styles.css";

function App() {
  const [deletedItems, setDeletedItems] = React.useState([]);
  const [items, setItems] = React.useState([
    { id: 7, name: "george" },
    { id: 8, name: "rupert" },
    { id: 9, name: "alice" },
    { id: 10, name: "katherine" },
    { id: 11, name: "pam" },
    { id: 12, name: "katie" }
  ]);

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    console.log(sourceId);
    console.log(sourceIndex);
    console.log(targetIndex);
    console.log(targetId);

    const result = swap(items, sourceIndex, targetIndex);
    return setItems(result);
  }
  const deleteItem = (idx) => {
    const copyOfState = items.slice();
    console.log(copyOfState);
    const deletedElement = copyOfState.splice(idx, 1);
    console.log(deletedElement);
    console.log(copyOfState);
    setDeletedItems([...deletedElement, ...deletedItems]);
    setItems(copyOfState);
    // DELETE THE ITEM TO THE DB

    console.log("++deletedItems", deletedItems);
  };
  const addNewModule = () => {
    const selectedModule = {
      id: 123,
      sorting_main_index: null,
      name: "MIN_02_MARCH"
    };
    const isModuleOnApp = items.map((x) => x.id).indexOf(selectedModule.id);
    if (isModuleOnApp > -1) {
      message.error("Is already in app");
      alert("IS already in app");
      return;
    }
    setItems([...items, selectedModule]);
  };
  const saveChanges = () => {
    // save changes to DB
    // create the patch object
    const toPatch = items.map((item, sorting_index) => {
      return {
        id: item.id,
        sorting_main_index: sorting_index
      };
    });
    console.log("++toPatch", toPatch);
  };
  return (
    <React.Fragment>
      <GridContextProvider onChange={onChange}>
        <div className="container">
          <GridDropZone
            className="dropzone left"
            id="left"
            boxesPerRow={2}
            rowHeight={100}
          >
            {items.map((item, idx) => (
              <GridItem key={item.name}>
                <div className="grid-item">
                  <div className="grid-item-content">
                    <button onClick={() => deleteItem(idx)}>x</button>
                    {item.name}
                  </div>
                </div>
              </GridItem>
            ))}
          </GridDropZone>
        </div>
      </GridContextProvider>
      <button onClick={addNewModule}>MIN_0_A21</button>
      <button onClick={saveChanges}>Save Changes</button>
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
