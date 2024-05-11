#include <stdio.h>
#include <winsock2.h>

#pragma comment(lib, "ws2_32.lib") // Winsockライブラリのリンク指定

int main() {
    WSADATA wsa;
    SOCKET server_socket, client_socket;
    struct sockaddr_in server_addr, client_addr;
    int client_addr_len = sizeof(client_addr);
    char response[] = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nHello, World!";

    // Winsockの初期化
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        printf("Failed. Error Code: %d", WSAGetLastError());
        return 1;
    }

    // ソケットの作成
    server_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket == INVALID_SOCKET) {
        printf("Error creating socket: %d", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(8080);
    server_addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK); // localhostのみを受け入れる

    // ソケットをIPアドレスとポートにバインド
    if (bind(server_socket, (struct sockaddr *)&server_addr, sizeof(server_addr)) == SOCKET_ERROR) {
        printf("Bind failed with error code: %d", WSAGetLastError());
        closesocket(server_socket);
        WSACleanup();
        return 1;
    }

    // クライアントからの接続を待機
    if (listen(server_socket, 3) == SOCKET_ERROR) {
        printf("Listen failed with error code: %d", WSAGetLastError());
        closesocket(server_socket);
        WSACleanup();
        return 1;
    }

    printf("Server listening on port 8080...\n");

    while (1) {
        // クライアントからの接続を受け入れ
        printf("-1");
        client_socket = accept(server_socket, (struct sockaddr *)&client_addr, &client_addr_len);
        printf("0\n");
        if (client_socket == INVALID_SOCKET) {
            printf("Accept failed with error code: %d\n", WSAGetLastError());
            closesocket(server_socket);
            WSACleanup();
            return 1;
        }

        printf("1\n");

        // クライアントにレスポンスを送信
        send(client_socket, response, sizeof(response), 0);

        printf("2\n");

        // ソケットを閉じる
        closesocket(client_socket);
    }

    // ソケットを閉じる
    closesocket(server_socket);
    WSACleanup();

    return 0;
}
