import React from "react";
class AppTile extends React.Component {
render() {
    const mystyle = {
        color: "black",
        backgroundColor: "grey",
        padding: "20px",
        fontFamily: "Arial",
        fontSize: "30",
        fontWeight: "bold",
        textAlign: "center"
      };
    return (
        <div style={mystyle}>****************Spot Rate Convertor***************</div>
    );
}
}
export default AppTile;