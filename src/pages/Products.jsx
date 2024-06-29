import { Form, Input, Modal, Button, Select, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Axios } from "../lib/axios";
import { formatCurrency } from "../utils/formatCurrency";

export function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, control, reset, setValue } = useForm();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [deleteProduct, setDeleteProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    Axios.get("/categories").then((res) => setCategories(res.data));
    Axios.get("/products").then((res) => setProducts(res.data));
  }, []);

  console.log(products);

  function onSubmit(data) {
    if (editProduct) {
      Axios.patch(`/products/${editProduct}`, {
        ...data,
        images: [data.images],
      });
    } else {
      Axios.post("/products", { ...data, images: [data.images] });
    }
    reset();
  }

  function onDeleteProduct() {
    Axios.delete(`/products/${deleteProduct}`);
    setDeleteProduct(null);
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Names",
      dataIndex: "name",
    },
    {
      title: "Price",
      render: (item) => formatCurrency(item.price),
    },
    {
      title: "Image",
      render: (item) => (
        <img width={50} height={50} src={item.images[0]} alt={item.name} />
      ),
    },
    {
      title: "Action",
      render: (item) => (
        <>
          <Button
            onClick={() => {
              setEditProduct(item.id);
              setIsModalOpen(true);
              setValue("name", item.name);
              setValue("images", item.images[0]);
              setValue("price", item.price);
              setValue("discount", item.discount);
              setValue("description", item.description);
              setValue("category_id", item.category_id);
            }}
          >
            edit
          </Button>
          <Button onClick={() => setDeleteProduct(item.id)}>delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>add product</Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input placeholder="name" {...field} />}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input placeholder="description" {...field} />
            )}
          />
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="category"
                options={categories}
                fieldNames={{ label: "name", value: "id" }}
                {...field}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input placeholder="price" type="number" {...field} />
            )}
          />
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <Input placeholder="discount" type="number" {...field} />
            )}
          />
          <Controller
            name="images"
            control={control}
            render={({ field }) => <Input placeholder="image" {...field} />}
          />
          <Button htmlType="submit">submit</Button>
        </Form>
      </Modal>
      <Table dataSource={products} columns={columns} />
      <Modal
        open={deleteProduct}
        onOk={onDeleteProduct}
        onCancel={() => setDeleteProduct(null)}
      >
        are you sure to delete product
      </Modal>
    </div>
  );
}

/*
export type TProduct = {
    name: string;
    description: string;
    category_id: number;
    price: number;
    discount?: number;
    images: string[];
}
*/
