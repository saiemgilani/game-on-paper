
import { useTable } from 'react-table'
import React, { FC, ReactElement } from 'react'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    table: {
      width: 300,
      [theme.breakpoints.down('xs')]: {
        width: 300,
      },
      [theme.breakpoints.down('sm')]: {
        width: 300,
      },
      [theme.breakpoints.down('md')]: {
        width: 300,
      },
      [theme.breakpoints.up('lg')]: {
        width: 400,
      },
      [theme.breakpoints.up('xl')]: {
        width: 400,
      },
      height: 200,
      margin: 10,
      position: 'relative',
      cursor: 'pointer',
      border: 'solid 1px black', 
      background: '#F2F2F2',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '3px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
    media: {
      height: 30,
    },
    hscore:{
      right: 5,
      top: 58,
      padding: 5,
      fontSize: '1.1rem',
      position: 'absolute',
    },
    ascore:{
      right: 5,
      top: 18,
      padding: 5,
      fontSize: '1.1rem',
      position: 'absolute',
    },
    actions: {
      right: 5,
      bottom: 5,
      padding: 5,
      position: 'absolute',
    },
  }))
type TeamBoxScoreProps = {
  columns: any[],
  data: any[]
}
export const TeamBoxScore: FC<TeamBoxScoreProps> = ({ columns, data }): ReactElement => {
    const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })
   const classes = useStyles()
  return (
    <div>
        <table {...getTableProps()} 
            style={{border: 'solid 1px black', 
                    background: '#F2F2F2',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '3px',}}>
            <thead>
            {headerGroups.map((headerGroup,index) => (
                <tr key={index}>
                {headerGroup.headers.map((column,index) => (
                    <th
                    key={index}
                    style={{
                        background: '#F2F2F2',
                        color: 'black',
                        fontWeight: 'bold',
                        padding: '3px',
                    }}
                    >
                    {column.render('Header')}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row,index) => {
                prepareRow(row)
                return (
                <tr key={index}>
                    {row.cells.map((cell,index) => {
                    return (
                        <td
                        key={index}
                        style={{
                            padding: '3px',
                            border: 'solid 1px gray',
                            background: 'white',
                            color: 'black'
                        }}
                        >
                        {cell.render('Cell')}
                        </td>
                    )
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
    </div>
  )
}