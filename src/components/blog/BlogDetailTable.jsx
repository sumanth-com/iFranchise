import BlogRichText from './BlogRichText';

/**
 * @param {{ caption?: string, headers: string[], rows: string[][], className?: string }} props
 */
export default function BlogDetailTable({ caption, headers, rows, className = '' }) {
  if (!headers?.length || !rows?.length) return null;

  return (
    <div className={`blog-table-wrap mt-5 -mx-1 overflow-x-auto overscroll-x-contain px-1 ${className}`}>
      <table className="blog-data-table w-full min-w-[520px] border-collapse text-left text-sm sm:text-[15px]">
        {caption ? (
          <caption className="blog-data-table__caption mb-3 px-1 text-left text-sm font-semibold sm:text-base">
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="blog-data-table__th px-3 py-2.5 sm:px-4 sm:py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="blog-data-table__row">
              {row.map((cell, ci) => (
                <td key={ci} className="blog-data-table__td px-3 py-2.5 align-top sm:px-4 sm:py-3">
                  <BlogRichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
