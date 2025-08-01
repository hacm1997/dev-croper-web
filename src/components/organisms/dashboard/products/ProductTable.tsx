/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Product } from "@/modules/products/dto/product.dto";
import { Button } from "primereact/button";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

type ProductTableProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  page: number;
  rows: number;
  onPageChange: (event: any) => void;
  onEdit: (id: string) => void;
  onDetails: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProductTable({
  products,
  loading,
  error,
  totalItems,
  page,
  rows,
  onPageChange,
  onEdit,
  onDetails,
  onDelete,
}: ProductTableProps) {

  return (
    <div className="card bg-[#18181b] text-[#f4f4f5] border-none">
      <DataTable
        value={products}
        loading={loading}
        paginator
        lazy
        first={(page - 1) * rows}
        rows={rows}
        totalRecords={totalItems}
        onPage={onPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{
          minWidth: "50rem",
          background: "#18181b",
          color: "#f4f4f5",
        }}
        className="p-datatable-dark custom-dark-table custom-dark-paginator b"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      >
        <Column
          field="name"
          header="Name"
          style={{ width: "25%", background: "#18181b", color: "#f4f4f5" }}
          headerStyle={{ background: "#27272a", color: "#f4f4f5" }}
        />
        <Column
          field="description"
          header="Description"
          style={{ width: "25%", background: "#18181b", color: "#f4f4f5" }}
          headerStyle={{ background: "#27272a", color: "#f4f4f5" }}
        />
        <Column
          field="price"
          header="Price"
          // sortable
          style={{ width: "25%", background: "#18181b", color: "#f4f4f5" }}
          headerStyle={{ background: "#27272a", color: "#f4f4f5" }}
        />
        <Column
          field="category"
          header="Category"
          style={{ width: "25%", background: "#18181b", color: "#f4f4f5" }}
          headerStyle={{ background: "#27272a", color: "#f4f4f5" }}
        />
        <Column
          header="Actions"
          headerStyle={{ width: "12rem" }}
          body={(row) => {
            return (
              <div className="flex gap-2">
                <Button
                  rounded
                  text
                  icon={<MdOutlineRemoveRedEye className="text-gray-400 text-2xl" />}
                  onClick={() => onDetails(row._id)}
                  tooltip="Details"
                  tooltipOptions={{ position: "left" }}
                />
                <Button
                  rounded
                  text
                  icon={<FaEdit className="text-blue-700 text-2xl" />}
                  onClick={() => onEdit(row._id)}
                  tooltip="Edit"
                  tooltipOptions={{ position: "left" }}
                />
                <Button
                  rounded
                  text
                  icon={<FaRegTrashAlt className="text-red-500 text-2xl" />}
                  onClick={() => onDelete(row._id)}
                  severity="danger"
                  tooltip="Delete"
                  tooltipOptions={{ position: "left" }}
                />
              </div>
            );
          }}
        />
      </DataTable>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <style jsx global>{`
        .custom-dark-table .p-datatable-thead > tr > th,
        .custom-dark-table .p-datatable-tbody > tr > td {
          background: #18181b !important;
          color: #f4f4f5 !important;
          border-color: #27272a !important;
          padding: 12px !important;
        }
        .custom-dark-table .p-datatable-thead > tr > th {
          background: #27272a !important;
          padding: 12px !important;
        }
        /* Separar el paginador de la tabla */
        .custom-dark-paginator-bar {
          margin-top: 32px !important;
        }
        .custom-dark-table .p-paginator {
          background: #18181b !important;
          color: #f4f4f5 !important;
          border: none !important;
        }
        .custom-dark-table .p-paginator .p-paginator-page.p-highlight {
          background: #27272a !important;
          color: #f4f4f5 !important;
        }
        .custom-dark-table
          .p-datatable
          .p-sortable-column:not(.p-highlight):hover {
          background: #23272f !important;
        }
        /* Select de per page options modo oscuro y alineado */
        .custom-dark-table .p-paginator .p-dropdown {
          background: #27272a !important;
          color: #f4f4f5 !important;
          border: 1px solid #27272a !important;
          min-width: 70px;
          height: 36px;
          display: flex;
          align-items: center;
        }
        .custom-dark-table .p-paginator .p-dropdown .p-dropdown-label {
          color: #f4f4f5 !important;
          background: transparent !important;
          display: flex;
          align-items: center;
        }
        .custom-dark-table .p-paginator .p-dropdown-panel {
          background: #27272a !important;
          color: #f4f4f5 !important;
        }
        .custom-dark-table .p-paginator .p-dropdown-item {
          background: #27272a !important;
          color: #f4f4f5 !important;
        }
        .custom-dark-table .p-paginator .p-dropdown-item.p-highlight {
          background: #18181b !important;
          color: #f4f4f5 !important;
        }
      `}</style>
    </div>
  );
}
