import { useCallback, useEffect, useState, useRef } from 'react';

function App() {
    const [password, setPassword] = useState('');
    const [isSpecialCharsInclude, setSpecialchars] = useState(false);
    const [isNumbersIncluded, setNumbers] = useState(false);
    const [pwdLength, setPwdLength] = useState(8);

    const passwordRef = useRef(null);

    const generatePassword = useCallback(() => {
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        if (isNumbersIncluded) str += '0123456789';
        if (isSpecialCharsInclude) str += '!@#$%^&*()_+';

        for (let i = 1; i < pwdLength; i++) {
            const char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);
    }, [pwdLength, isSpecialCharsInclude, isNumbersIncluded]); // while using useCallback() pass this array of variables that do not change often for Memoization

    // Runs atleast once whenever the page loads, and whenever the values in the array changes
    useEffect(() => {
        generatePassword();
    }, [pwdLength, isNumbersIncluded, isSpecialCharsInclude]); // here, this array contains values that change often to run the internal code.

    const copyToClipBoard = () => {
        window.navigator.clipboard.writeText(password);
        passwordRef.current?.select();
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100">
                <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                            value={password}
                            readOnly
                            ref={passwordRef}
                        />
                        <button
                            onClick={copyToClipBoard}
                            className="rounded-lg bg-violet-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
                        >
                            Copy
                        </button>
                    </div>
                    <div className="mt-6 space-y-5">
                        <div className="flex items-center justify-between text-sm text-zinc-300">
                            <label htmlFor="password-length">
                                Password length
                            </label>
                            <span>{pwdLength}</span>
                        </div>
                        <input
                            id="password-length"
                            type="range"
                            value={pwdLength}
                            min={8}
                            max={100}
                            step={1}
                            onInput={(e) =>
                                setPwdLength(Number(e.currentTarget.value))
                            }
                            className="w-full cursor-pointer accent-violet-500"
                        />
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
                            <input
                                onChange={() => {
                                    setSpecialchars((prev) => !prev);
                                }}
                                type="checkbox"
                                className="size-4 accent-violet-500"
                            />
                            Include Special Characters
                        </label>
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
                            <input
                                onChange={() => {
                                    setNumbers((prev) => !prev);
                                }}
                                type="checkbox"
                                className="size-4 accent-violet-500"
                            />
                            Include Numbers
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
