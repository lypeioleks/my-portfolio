const Contacts = () => {
    return (
        <main className="section">
        <div className="container">
                <h1 className="title-1">Contacts</h1>

                <ul className="content-list">
                    <li className="content-list__item">
                        <h2 className="title-2">Location</h2>
                        <p>Chust, Ukraine</p>
                    </li>
                    <li className="content-list__item">
                        <h2 className="title-2">Telegram / WhatsApp</h2>
                        <p><a href="tel:+380686913787">+38 (068) 691-37-87</a></p>
                    </li>
                    <li className="content-list__item">
                        <h2 className="title-2">Email</h2>
                        <p><a href="mailto:lypei.oleksandr@student.uzhnu.edu.ua">lypei.oleksandr@student.uzhnu.edu.ua</a></p>
                    </li>
                </ul>

        </div>
    </main>
    );
};

export default Contacts;
