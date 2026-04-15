import React, { useState, useEffect } from "react";
import {
Routes,
Route,
Link,
Outlet
} from "react-router-dom";
import axios from "axios";


function Navigation() {
return (
<div style={{ backgroundColor: '#da89eb', padding: '10px 0', marginBottom: '20px' }}>
<nav style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '20px' }}>
<Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '4px' }}>Home</Link>
<Link to="/price-checker" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '4px' }}>Price Checker</Link>
<Link to="/api-practice" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '4px' }}>Post Manager</Link>
</nav>
<hr />
<Outlet />
</div>
);
}

function HomePage() {
useEffect(() => {
document.title = "Home";
}, []);
return (
<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
<h1 style={{ color: '#f069c3', textAlign: 'center', marginBottom: '30px' }}>Welcome to the App</h1>
<h2 style={{ color: '#ae55e2', borderBottom: '2px solid #f192f1', paddingBottom: '10px', marginBottom: '20px' }}>Features:</h2>
<ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
<li style={{ marginBottom: '10px' }}><b>Conditional Rendering:</b> Dynamically show or hide components based on state.</li>
<li style={{ marginBottom: '10px' }}><b>useEffect Hook:</b> Perform side effects like updating the page title or fetching data.</li>
<li style={{ marginBottom: '10px' }}><b>Routing:</b> Navigate between different pages using React Router.</li>
</ul>
</div>
);
}


function ProductDetails({ onCalculate }) {
const [name, setName] = useState("");
const [quantity, setQuantity] = useState("");
const [price, setPrice] = useState("");
const handleCalculate = () => {
if (!name || !quantity || !price) return;
onCalculate({
name,
quantity: Number(quantity),
price: Number(price),
total: Number(quantity) * Number(price),
});
};

const handleReset = () => {
setName("");
setQuantity("");
setPrice("");
onCalculate(null);
};

return (
<div style={{ marginBottom: '30px' }}>
<h2 style={{ color: '#e289f8', borderBottom: '2px solid #d68ef7', paddingBottom: '10px', marginBottom: '20px' }}>Product Details</h2>
<div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
<input
type="text"
placeholder="Product Name"
value={name}
onChange={(e) => setName(e.target.value)}
style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
/>
<input
type="number"
placeholder="Quantity"
value={quantity}
onChange={(e) => setQuantity(e.target.value)}
style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
/>
<input
type="number"
placeholder="Unit Price"
value={price}
onChange={(e) => setPrice(e.target.value)}
style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
/>
<div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
<button onClick={handleCalculate} style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#3498db', color: 'white', cursor: 'pointer', fontSize: '16px' }}>Calculate</button>
<button onClick={handleReset} style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#95a5a6', color: 'white', cursor: 'pointer', fontSize: '16px' }}>Reset</button>
</div>
</div>
</div>
);
}

function BillingDetails({ product }) {
return (
<div style={{ marginBottom: '30px' }}>
<h2 style={{ color: '#d582f7', borderBottom: '2px solid #d87bf0', paddingBottom: '10px', marginBottom: '20px' }}>Billing Summary</h2>
<div style={{ backgroundColor: '#ecf0f1', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
<p><strong>Product:</strong> {product.name}</p>
<p><strong>Quantity:</strong> {product.quantity}</p>
<p><strong>Unit Price:</strong> ${product.price}</p>
<p style={{ fontSize: '1.2em', color: '#dd6bec' }}><strong>Total: ${product.total}</strong></p>
</div>
</div>
);
}

function PriceChecker() {
const [product, setProduct] = useState(null);

useEffect(() => {
document.title = "Price Checker";
}, []);

return (
<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
<h1 style={{ color: '#c254e4', textAlign: 'center', marginBottom: '30px' }}>Price Calculator</h1>
<ProductDetails onCalculate={setProduct} />
{product && <BillingDetails product={product} />}
</div>
);
}


function ApiPractice() {
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [form, setForm] = useState({ title: "", body: "" });
const [editingId, setEditingId] = useState(null);
useEffect(() => {
document.title = "Post Manager";
fetchPosts();
}, []);

const fetchPosts = async () => {
setLoading(true);
setError("");
try {
const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5");
const englishTitles = [
"Welcome to Our Blog",
"Understanding React Hooks",
"Building Modern Web Apps",
"The Future of JavaScript",
"Tips for Better Coding"
];
const englishBodies = [
"This is our first blog post where we introduce the purpose and goals of this blog. We aim to share knowledge about web development and technology trends.",
"React hooks are a powerful feature that allows you to use state and other React features in functional components. They make code more reusable and easier to understand.",
"Modern web applications require careful planning and the right tools. In this post, we discuss the best practices for building scalable and maintainable web apps.",
"JavaScript continues to evolve with new features and improvements. We'll explore upcoming changes and how they will impact web development.",
"Writing clean, efficient code is essential for any developer. Here are some practical tips to improve your coding skills and productivity."
];
const updatedPosts = res.data.map((post, index) => ({
...post,
title: englishTitles[index] || post.title,
body: englishBodies[index] || post.body
}));
setPosts(updatedPosts);
} catch (err) {
setError("Failed to load posts. Please try again.");
} finally {
setLoading(false);
}
};

const handleSubmit = async () => {
try {
if (editingId) {
const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${editingId}`, form);
setPosts(posts.map(p => p.id === editingId ? res.data : p));
setEditingId(null);
} else {
const res = await axios.post("https://jsonplaceholder.typicode.com/posts", form);
setPosts([res.data, ...posts]);
}
setForm({ title: "", body: "" });
} catch {
setError("Failed to save post. Please try again.");
}
};

const handleDelete = async (id) => {
try {
await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
setPosts(posts.filter(p => p.id !== id));
} catch {
setError("Failed to delete post. Please try again.");
}
};

return (
<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
<h1 style={{ color: '#bf77f0', textAlign: 'center', marginBottom: '30px' }}>Post Manager</h1>
{loading && <p style={{ textAlign: 'center', fontSize: '18px', color: '#d369d3' }}>Loading posts...</p>}
{error && <p style={{ textAlign: 'center', color: '#e74c3c', backgroundColor: '#faddd7', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{error}</p>}

<h2 style={{ color: '#34495e', borderBottom: '2px solid #3498db', paddingBottom: '10px', marginBottom: '20px' }}>Blog Posts</h2>
<table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
<thead>
<tr>
<th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#34495e', color: 'white' }}>ID</th>
<th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#34495e', color: 'white' }}>Title</th>
<th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#34495e', color: 'white' }}>Content</th>
<th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#34495e', color: 'white' }}>Actions</th>
</tr>
</thead>
<tbody>
{posts.map(post => (
<tr key={post.id} style={{ backgroundColor: 'white' }}>
<td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{post.id}</td>
<td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{post.title}</td>
<td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{post.body}</td>
<td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
<button onClick={() => { setForm({ title: post.title, body: post.body }); setEditingId(post.id); }} style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#f39c12', color: 'white', cursor: 'pointer', fontSize: '16px', marginRight: '5px' }}>Edit</button>
<button onClick={() => handleDelete(post.id)} style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#e74c3c', color: 'white', cursor: 'pointer', fontSize: '16px' }}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>

<h2 style={{ color: '#34495e', borderBottom: '2px solid #3498db', paddingBottom: '10px', marginBottom: '20px' }}>{editingId ? "Edit Post" : "Add New Post"}</h2>
<div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
<input
type="text"
placeholder="Post Title"
value={form.title}
onChange={(e) => setForm({ ...form, title: e.target.value })}
style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
/>
<input
type="text"
placeholder="Post Content"
value={form.body}
onChange={(e) => setForm({ ...form, body: e.target.value })}
style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
/>
<button onClick={handleSubmit} style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#3498db', color: 'white', cursor: 'pointer', fontSize: '16px' }}>{editingId ? "Update Post" : "Add Post"}</button>
</div>
</div>
);
}


function App() {
return (
<div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, padding: 0, backgroundColor: '#f4f4f4', color: '#333', minHeight: '100vh' }}>
<Routes>
<Route path="/" element={<Navigation />}>
<Route index element={<HomePage />} />
<Route path="price-checker" element={<PriceChecker />} />
<Route path="api-practice" element={<ApiPractice />} />
</Route>
</Routes>
</div>
);
}

export default App;