"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("get-button");
    const message = document.createElement("p");
    message.textContent = "Kliknij, aby załadować dane";
    document.body.appendChild(message);
    if (button) {
        button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            message.textContent = "Ładuję dane...";
            message.style.color = "blue";
            try {
                const res = yield fetch("/load-data");
                const data = yield res.json();
                if (data.status === "success") {
                    message.textContent = "✅ Dane załadowane!";
                    message.style.color = "green";
                }
                else {
                    message.textContent = "❌ Błąd ładowania danych!";
                    message.style.color = "red";
                }
            }
            catch (err) {
                message.textContent = "❌ Błąd połączenia!";
                message.style.color = "red";
            }
        }));
    }
});
