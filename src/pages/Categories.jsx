import { useEffect, useState } from "react";
import { Axios } from "../lib/axios";
import { Button, Form, Input, Modal, Table } from "antd";
import { Controller, useForm } from "react-hook-form";
import { slugify } from "../utils/slugify";
import parse from "html-react-parser";

export function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteCategory, setDeleteCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  const { handleSubmit, control, reset, setValue } = useForm();

  async function getCategories() {
    const res = await Axios.get("/categories");
    setCategories(res.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function onSubmit(data) {
    if (editCategory) {
      Axios.patch(`/categories/${editCategory}`, {
        ...data,
        slug: slugify(data.name),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      Axios.post("/categories", { ...data, slug: slugify(data.name) })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    reset();
    setIsModalOpen(false);
    setEditCategory(null);
    getCategories();
  }

  function onDeleteCategory() {
    Axios.delete(`/categories/${deleteCategory}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setDeleteCategory(null);
    getCategories();
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Icon",
      render: (item) => parse(item.icon),
    },
    {
      title: "Action",
      render: (item) => (
        <>
          <Button
            onClick={() => {
              setEditCategory(item.id);
              setIsModalOpen(true);
              setValue("name", item.name);
              setValue("icon", item.icon);
            }}
          >
            edit
          </Button>
          <Button onClick={() => setDeleteCategory(item.id)}>delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>add category</Button>
      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          reset();
        }}
        footer={null}
      >
        <Form onFinish={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => <Input placeholder="name" {...field} />}
          />
          <Controller
            control={control}
            name="icon"
            render={({ field }) => <Input placeholder="icon" {...field} />}
          />
          <Button htmlType="submit">submit</Button>
        </Form>
      </Modal>
      <Table dataSource={categories} columns={columns} />
      <Modal open={deleteCategory} onOk={onDeleteCategory}>
        are you sure to delete category
      </Modal>
    </>
  );
}
