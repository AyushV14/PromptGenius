
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/databasse";

// Get (read)

export const GET = async (request,{params}) =>{
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found",{ status: 404 })

        return new Response(JSON.stringify(prompt),{
            status:200
        })
    } catch (error) {
        return new Response('Failed to fetch data'),{
            status:500
        }
    }
}

// PATCH (update)

export const PATCH = async (request,{params})=>{
    const {prompt , tag } = await request.json();

    try {
        await connectToDB();

        const exisitingPromot = await Prompt.findById(params.id);

        if(!exisitingPromot) return new Response("Prompt Not found",{status:404})

        exisitingPromot.prompt = prompt;
        exisitingPromot.tag = tag;

        await exisitingPromot.save();

        return new Response(JSON.stringify(exisitingPromot),{status:200})
    } catch (error) {
        return new Response("Failed to update",{status:500})
    }
}

// DELETE (delete)

export const DELETE = async (request,{params})=>{
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt Deleted succesfully",{status:200})
    } catch (error) {
        return new Response("Prompt Deletion failed",{status:500})

    }
}

