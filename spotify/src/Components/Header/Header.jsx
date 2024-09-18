function Header() {
    return (
        <header className="header">
            <img src="logo.png" alt="Company Logo" className="logo" />
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/albums">albums</a></li>
                    <li><a href="/artistes">artistes</a></li>
                    <li><a href="/genres">genres</a></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header