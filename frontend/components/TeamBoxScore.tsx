
import { useTable } from 'react-table'

type TeamBoxScoreProps = {
  columns: columnData[],
  data: Data[]
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
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th
                    {...column.getHeaderProps()}
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
            {rows.map(row => {
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return (
                        <td
                        {...cell.getCellProps()}
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