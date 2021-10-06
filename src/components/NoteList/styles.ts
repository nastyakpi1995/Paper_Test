interface IStyle {
    border: string,
    paddingLeft: number,
    paddingRight: number,
    marginTop: number,
    margin: number,
    display: string,
    flexDirection: 'row',
    justifyContent: string
}

interface IStyles {
    mainWrap: IStyle
}

export const styles: IStyles = {
    mainWrap: {
        border: '1px solid',
        paddingLeft: 420,
        paddingRight: 420,
        marginTop: 20,
        margin: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}