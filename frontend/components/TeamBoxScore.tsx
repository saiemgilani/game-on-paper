
import { useTable } from 'react-table'
import React, { FC, ReactElement } from 'react'

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
  return (
    <div>
        <table {...getTableProps()} 
            style={{border: 'solid 1px black', 
                    marginLeft: 'auto',
                    marginRight: 'auto'}}>
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                    <th
                    key={column.getHeaderProps()}
                    style={{
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                    }}
                    >
                    {column.render('Header')}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row)
                return (
                <tr key={row.getRowProps()}>
                    {row.cells.map((cell) => {
                    return (
                        <td
                        key={cell.getCellProps()}
                        style={{
                            padding: '10px',
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