import { useState } from "react";

function History({
    history,
    onLoad,
    onDelete,
    onClear,
    isDeleting,
    isClearing,
}) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredHistory = history.filter((session) =>
        session.text
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="history">
            <div className="history-header">
                <h2>History</h2>

                {history.length > 0 && (
                    <button
                        className="history-clear"
                        onClick={onClear}
                        disabled={isClearing}
                    >
                        {isClearing
                            ? "Clearing..."
                            : "Clear History"}
                    </button>
                )}
            </div>

            {history.length > 0 && (
                <input
                    className="history-search"
                    type="text"
                    placeholder="Search history..."
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                />
            )}

            {history.length === 0 ? (
                <p className="history-empty">
                    No saved speech sessions yet.
                </p>
            ) : filteredHistory.length === 0 ? (
                <p className="history-empty">
                    No matching sessions found.
                </p>
            ) : (
                <div className="history-list">
                    {filteredHistory.map((session) => (
                        <div
                            className="history-item"
                            key={session.id}
                        >
                            <div className="history-content">
                                <p>
                                    {session.text}
                                </p>

                                <small>
                                    {new Date(
                                        session.createdAt
                                    ).toLocaleString()}
                                </small>
                            </div>

                            <div className="history-actions">
                                <button
                                    className="history-load"
                                    onClick={() =>
                                        onLoad(session.text)
                                    }
                                >
                                    Load
                                </button>

                                <button
                                    className="history-delete"
                                    onClick={() =>
                                        onDelete(session.id)
                                    }
                                    disabled={isDeleting}
                                >
                                    {isDeleting
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default History;