import * as React from "react";
import CellRow from "./CellRow";
import ConnectorRow from "./ConnectorRow";
// import { saveAs } from 'file-saver'
// import domtoimage from 'dom-to-image';
const randomColor = Math.floor(Math.random() * 16777215).toString(16);
const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
const randomColor3 = Math.floor(Math.random() * 16777215).toString(16);

function ProfileGenerator() {
  const [columns, setColumns] = React.useState(5);
  const [rows, setRows] = React.useState(5);
  const [size, setSize] = React.useState(35);
  const [borderRadius, setBorderRadius] = React.useState(50);
  const [color, setColor] = React.useState(`#${randomColor2}`);
  const [backgroundColor, setBackgroundColor] = React.useState(
    `#${randomColor}`
  );
  const [connectionProbability, setConnectionProbability] = React.useState(50);
  const [slantInfluence, setSlantInfluence] = React.useState(5);
  const [gridScale, setGridScale] = React.useState(1);
  const [update, setUpdate] = React.useState(true);
  // set initial hash back to
  React.useEffect(() => {
    // parse the hash
    if (location.hash) {
      const params = location.hash.slice(1).split("-");
      setColumns(params[0]);
      setRows(params[1]);
      setSize(params[2]);
      setBorderRadius(params[3]);
      setColor(params[4]);
      setBackgroundColor(params[5]);
      setConnectionProbability(params[6]);
      setSlantInfluence(params[7]);
      setGridScale(params[8]);
    }
  }, []);

  function generateHashData(params) {
    return params.join("-");
  }

  const downloadImage = () => {
    setIsButtonLoading(true);
    // domtoimage.toBlob(document.getElementById('main-content'))
    //   .then(function(blob) {
    //     saveAs(blob, 'blobs.png')
    //   }).then(function() {
    //     setIsButtonLoading(false)
    //   })
  };

  // Set the hash after each state var changes
  React.useEffect(() => {
    location.hash = generateHashData([
      columns,
      rows,
      size,
      borderRadius,
      color,
      backgroundColor,
      connectionProbability,
      slantInfluence,
      gridScale,
    ]);
  }, [
    columns,
    rows,
    size,
    borderRadius,
    color,
    backgroundColor,
    connectionProbability,
    slantInfluence,
    gridScale,
  ]);
  const isMobile = false;
  const slantInfluenceFixed = (100 + Number(slantInfluence)) / 200;

  const [isButtonLoading, setIsButtonLoading] = React.useState(false);

  let cellRows = [];
  for (let i = 0; i < rows; i++) {
    cellRows.push(
      <CellRow
        columns={columns}
        size={size}
        color={color}
        borderRadius={borderRadius}
      />
    );
  }

  const connectorRows = React.useMemo(() => {
    return addConnectorRows(
      rows,
      columns,
      size,
      color,
      backgroundColor,
      borderRadius,
      connectionProbability,
      slantInfluenceFixed
    );
  }, [
    columns,
    rows,
    size,
    color,
    backgroundColor,
    borderRadius,
    connectionProbability,
    slantInfluence,
    update,
  ]);

  function addConnectorRows(
    rows,
    columns,
    size,
    color,
    backgroundColor,
    borderRadius,
    connectionProbability,
    slantInfluenceFixed
  ) {
    let rowArray = [];
    for (let x = 0; x < rows - 1; x++) {
      rowArray.push(
        <ConnectorRow
          columns={columns - 1}
          size={size}
          color={color}
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
          connectionProbability={connectionProbability}
          slantInfluence={slantInfluenceFixed}
        />
      );
    }
    return rowArray;
  }

  return (
    <div>
      <div
        id="main-content"
        style={{
          transform: "scale(" + gridScale + ")",
          border: `3px solid #${randomColor3}`,
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100vh",
            maxHeight: "-webkit-fill-available",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            left: "16px",
          }}
        >
          {connectorRows}
        </div>
        <div
          style={{
            position: "absolute",
            height: "100vh",
            maxHeight: "-webkit-fill-available",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            left: "16px",
          }}
        >
          {connectorRows}
        </div>
        <main style={{ backgroundColor: backgroundColor }}>{cellRows}</main>
      </div>
    </div>
  );
}

export default ProfileGenerator;
