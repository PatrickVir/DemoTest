import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Button, Form, Input, message, Modal, Select, Space, Table } from 'antd';
import { faker } from '@faker-js/faker';
import { User } from '.prisma/client';
import { Author } from '.prisma/client';
import { Book } from '.prisma/client';
const inter = Inter({ subsets: ['latin'] });

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 12 },
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = () => {
    fetch('/api/all_user', { method: 'GET' }).then((res) => {
      res.json().then((json) => {
        setUsers(json);
      });
    });
  };

  const fetchAuthors = () => {
    fetch('/api/all_author', { method: 'GET' }).then((res) => {
      res.json().then((json) => {
        setAuthors(json);
      });
    });
  };

  const fetchBooks = () => {
    fetch('/api/all_book', { method: 'GET' }).then((res) => {
      res.json().then((json) => {
        setBooks(json);
      });
    });
  };

  useEffect(() => {
    fetchUsers();
    fetchAuthors();
    fetchBooks();
  }, []);

  const onFinishUser = async (values: any) => {
    // Implementation for creating a user
    // ...

    fetch('/api/create_user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(async (response) => {
        // Handle response
        // ...
        fetchUsers(); // Refresh the user list after creating a user
      })
      .catch((res) => {
        message.error(res);
      });
  };

  const onDeleteUser = async (user: any) => {
    // Implementation for deleting a user
    // ...

    const { id } = user;
    fetch('/api/delete_user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then(async (response) => {
        // Handle response
        // ...
        fetchUsers(); // Refresh the user list after deleting a user
      })
      .catch((res) => {
        message.error(res);
      });
  };

  const onFinishAuthor = async (values: any) => {
    // Implementation for creating an author
    // ...

    fetch('/api/create_author', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(async (response) => {
        // Handle response
        // ...
        fetchAuthors(); // Refresh the author list after creating an author
      })
      .catch((res) => {
        message.error(res);
      });
  };

  const onDeleteAuthor = async (author: any) => {
    // Implementation for deleting an author
    // ...

    const { id } = author;
    fetch('/api/delete_author', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then(async (response) => {
        // Handle response
        // ...
        fetchAuthors(); // Refresh the author list after deleting an author
      })
      .catch((res) => {
        message.error(res);
      });
  };

  const onFinishBook = async (values: any) => {
    // Implementation for creating a book
    // ...

    fetch('/api/create_book', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(async (response) => {
        // Handle response
        // ...
        fetchBooks(); // Refresh the book list after creating a book
      })
      .catch((res) => {
        message.error(res);
      });
  };

  const onDeleteBook = async (book: any) => {
    // Implementation for deleting a book
    // ...

    const { id } = book;
    fetch('/api/delete_book', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then(async (response) => {
        // Handle response
        // ...
        fetchBooks(); // Refresh the book list after deleting a book
      })
      .catch((res) => {
        message.error(res);
      });
  };

  // Similar to User columns
  const columnsUsers: ColumnsType<User> = [
    // ...
  ];

  // Similar to User columns
  const columnsAuthors: ColumnsType<Author> = [
    // ...
  ];

  // Similar to User columns
  const columnsBooks: ColumnsType<Book> = [
    // ...
  ];

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    // Implementation for filling the form
    // ...
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const switchForm = (tab: string) => {
    setIsModalOpen(true);
    setActiveTab(tab);
    form.resetFields();
  };

  const modalContent = {
    'user': (
      // Existing User form
      // ...
    ),
    'author': (
      // Author form
      <Form
        {...layout}
        form={form}
        name="author-form"
        onFinish={onFinishAuthor}
        style={{ maxWidth: 600 }}
      >
        {/* Author form fields */}
      </Form>
    ),
    'book': (
      // Book form
      <Form
        {...layout}
        form={form}
        name="book-form"
        onFinish={onFinishBook}
        style={{ maxWidth: 600 }}
      >
        {/* Book form fields */}
      </Form>
    ),
  }[activeTab];

  return (
    <>
      <Space size="middle">
        <Button onClick={() => switchForm('user')}>Add User</Button>
        <Button onClick
