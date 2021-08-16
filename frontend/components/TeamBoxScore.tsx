
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
                    background: '#F2F2F2',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '3px',}}>
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                    <th
                    key={column.getHeaderProps()}
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
            {rows.map((row) => {
                prepareRow(row)
                return (
                <tr key={row.getRowProps()}>
                    {row.cells.map((cell) => {
                    return (
                        <td
                        key={cell.getCellProps()}
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