interface IStyle {
  paddingLeft?: number;
  paddingRight?: number;
  marginTop?: number;
  margin?: number;
  display?: string;
  flexDirection?: "row";
  justifyContent?: string;
  background?: string;
  padding?: number;
  borderBottom?: string;
  width?: number;
  height?: number | string;
}

interface IStyles {
  mainWrap: IStyle;
  list: IStyle;
}

export const styles: IStyles = {
  mainWrap: {
    background: "#ececec",
    paddingLeft: 420,
    paddingRight: 420,
    marginTop: 20,
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100vh",
  },
  list: {
    background: "white",
    paddingRight: 49,
    paddingLeft: 19,
    width: 350,
    borderBottom: "1px solid grey",
    marginTop: 5,
  },
};
