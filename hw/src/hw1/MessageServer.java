package hw1;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Scanner;

public class MessageServer {
    ServerSocket serverSocket;
    ArrayList<MessageClientHandler> clientHandlers;

    public MessageServer() {
        serverSocket = null;
        clientHandlers = new ArrayList<>();
    }

    public static void main(String[] args) throws IOException {
        MessageServer ms = new MessageServer();
        try {
            ms.serverSocket = new ServerSocket(4444);
            System.out.println(ms.serverSocket);
        } catch (IOException e) {
            System.out.println("Could not listen on port: 4444");
            System.exit(-1);
        }
        ms.start();
    }

    private void start() {
        while (true) {
            Socket clientSocket = null;
            try {
                clientSocket = serverSocket.accept();
                System.out.println("Client attempting to access server...");
                MessageClientHandler mch = new MessageClientHandler(clientSocket, this);
                clientHandlers.add(mch);
                Thread t = new Thread(mch);
                t.start();
            } catch (IOException e) {
                System.out.println("Accept failed: 4444");
                System.exit(-1);
            }
        }
    }

    public void broadcast(String message) {
        System.out.println("Message Received > " + message);
        for (MessageClientHandler mch : clientHandlers) {
            mch.handleRequest(message);
        }
    }
}

class MessageClientHandler implements Runnable {
    Socket s;
    MessageServer ms;

    MessageClientHandler(Socket s, MessageServer ms) {
        this.s = s;
        this.ms = ms;
    }

    public void run() {
        Scanner in;
        PrintWriter out;

        try {
            in = new Scanner(new BufferedInputStream(s.getInputStream()));
            out = new PrintWriter(new BufferedOutputStream(s.getOutputStream()));

            out.println("all Welcome to the chat");
            out.flush();

            while (true) {
                String message = in.nextLine();
                ms.broadcast(message);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    void handleRequest(String message) {
        try {
            PrintWriter out = new PrintWriter(new BufferedOutputStream(s.getOutputStream()));
            out.println(message);
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
